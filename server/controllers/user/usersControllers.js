import UserModel from '../../models/userModel.js';
import transporter from '../../utils/email.js';
import bcrypt from 'bcryptjs';
import { userGenerateToken } from '../../utils/generateToken.js';

// Register User
export const registerUser = async (req, res) => {
  try {
    const { name, email, mobile, password, status } = req.body;

    const userExist = await UserModel.findOne({ $or: [{ email }, { mobile }] });
    if (userExist) {
      return res.status(400).json({ message: 'User already exists with this email or mobile!' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpExpiry = Date.now() + 60 * 1000; 

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new UserModel({
      name,
      email,
      mobile,
      password: hashedPassword,
      status,
    });

    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();

    const mailOptions = {
      from: 'mohamedejaz075@gmail.com',
      to: email,
      subject: 'Your OTP Code',
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; border-radius: 10px; max-width: 500px; margin: 0 auto; color: #333;">
          <h4 style="margin-top: 0; color: #4CAF50;">Hi ${name},</h4>
          <h1 style="font-size: 24px; color: #333;">Your OTP code for registration is:
            <strong style="color: #ff5722;">${otp}</strong>
          </h1>
          <p style="line-height: 1.6; font-size: 16px;">Please use this code to verify your email address. This OTP is valid for only 60 seconds.</p>
          <p style="margin-top: 20px; line-height: 1.6; font-size: 14px;">Best regards,<br><strong>Your Team</strong></p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    setTimeout(async () => {
      const foundUser = await UserModel.findOne({ email });
      if (foundUser && !foundUser.isVerified && foundUser.otpExpiry < Date.now()) {
        await UserModel.deleteOne({ email });
        console.log(`User with email ${email} deleted due to expired OTP.`);
      }
    }, 60000); // 60 seconds timeout

    res.status(200).json({ message: 'OTP sent successfully!', user });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({
        message: 'Duplicate email or mobile detected!',
        error: err.message,
      });
    }
    console.error('Error occurred:', err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};

// Verify OTP for Registration
export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found!' });
    }

    if (user.otp !== Number(otp)) {
      return res.status(400).json({ message: 'Invalid OTP! Try again.' });
    }

    if (user.otpExpiry < Date.now()) {
      await UserModel.deleteOne({ email });
      return res.status(400).json({ message: 'OTP has expired! User has been deleted.' });
    }

    await UserModel.updateOne(
      { email },
      { otp: null, otpExpiry: null, isVerified: true }
    );

    const updatedUser = await UserModel.findOne({ email });

    const token = userGenerateToken(email);

    res.status(200).json({ message: 'User verified successfully!', user: updatedUser, token });
  } catch (err) {
    console.error('Error occurred during OTP verification:', err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};

// Resend OTP
export const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found!' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpExpiry = Date.now() + 60 * 1000;

    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: 'Your New OTP Code',
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; border-radius: 10px; max-width: 500px; margin: 0 auto; color: #333;">
          <h4 style="margin-top: 0; color: #4CAF50;">Hi ${user?.name},</h4>
          <h1 style="font-size: 24px; color: #333;">Your New OTP code for registration is:
            <strong style="color: #ff5722;">${otp}</strong>
          </h1>
          <p style="line-height: 1.6; font-size: 16px;">Please use this code to verify your email address. This OTP is valid for only 60 seconds.</p>
          <p style="margin-top: 20px; line-height: 1.6; font-size: 14px;">Best regards,<br><strong>Your Team</strong></p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    setTimeout(async () => {
      const foundUser = await UserModel.findOne({ email });
      if (foundUser && !foundUser.isVerified && foundUser.otpExpiry < Date.now()) {
        await UserModel.deleteOne({ email });
        console.log(`User with email ${email} deleted due to expired OTP.`);
      }
    }, 60000); // 60 seconds timeout

    res.status(200).json({ message: 'OTP resent successfully!' });
  } catch (err) {
    console.error('Error during OTP resend:', err);
    res.status(500).json({ message: 'Failed to resend OTP', error: err.message });
  }
};

// Login User
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required!' });
  }

  try {
    const user = await UserModel.findOne({ email })

    if (!user?.status) {
      return res.status(400).json({ message: 'Access denied!' });
    }

    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password!' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password!' });
    }

    const token = userGenerateToken(user.email);

    res.status(200).json({
      message: 'Login successful!',
      user,
      token,
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Server error, please try again later!' });
  }
};

// Google Authentication
export const handle_google_auth = async (req, res) => {
  try {
    const { credential } = req.body;
    const { name, email, picture } = credential;

    let user = await UserModel.findOne({ email });
    let isNew = false;

    if (!user) {
      isNew = true;
      user = new UserModel({
        name,
        email,
        mobile,
        profilePicture: picture,
        isVerified: true,
      });
      await user.save();
    } else {
      if (!user.status) {
        // If the user's status is false, deny login
        return res.status(403).json({ message: 'Account is disabled' });
      }

      // Update user details if already exists
      user.name = name || user.name;
      user.profilePicture = picture || user.profilePicture;
      await user.save();
    }

    const token = userGenerateToken(email);

    res.status(200).json({
      message: isNew ? 'Sign-Up successful' : 'Login successful',
      user,
      token,
    });
  } catch (error) {
    console.error('Error in Google Authentication:', error);
    return res.status(500).json({ message: 'Internal server error', error });
  }
};

// Get Current User
export const get_current_user = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) console.log('Error: No ID provided');

    const currUser = await UserModel.findById(id);

    if (!currUser) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json({
      message: 'User retrieved successfully.',
      currentUser: currUser,
    });
  } catch (error) {
    console.error('Error in getCurrentUser:', error.message);
    res.status(500).json({ message: 'Failed to get user details' });
  }
};

// Forgot Password
export const forgotPassword = async (req, res) => {
  const { email } = req.params;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found!' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpExpiry = Date.now() + 60 * 1000; // 60 seconds expiry

    user.forgotOtp = otp;
    user.forgotOtpExpiry = otpExpiry;
    await user.save();

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: 'Password Reset OTP',
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; border-radius: 10px; max-width: 500px; margin: 0 auto; color: #333;">
          <h4 style="margin-top: 0; color: #4CAF50;">Hi ${user?.name},</h4>
          <h1 style="font-size: 24px; color: #333;">Your OTP code for resetting your password is:
            <strong style="color: #ff5722;">${otp}</strong>
          </h1>
          <p style="line-height: 1.6; font-size: 16px;">Please use this code to reset your password. This OTP is valid for only 60 seconds.</p>
          <p style="margin-top: 20px; line-height: 1.6; font-size: 14px;">Best regards,<br><strong>Your Team</strong></p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'OTP sent for password reset!' });
  } catch (err) {
    console.error('Error in Forgot Password:', err);
    res.status(500).json({ message: 'Failed to send OTP for password reset', error: err.message });
  }
};

export const verifyForgotPassword = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await UserModel.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ message: 'User not found!' });
    }

   
    if (user.forgotOtp !== Number(otp)) {
      return res.status(400).json({ message: 'Invalid OTP! Try again.' });
    }

  
    if (user.forgotOtpExpiry < Date.now()) {
      await UserModel.updateOne({ email },{otp: null, otpExpiry: null}); 
      return res.status(400).json({ message: 'OTP has expired! Try again !.' });
    }

    
    await UserModel.updateOne(
      { email },
      { forgotOtp: null, forgotOtpExpiry: null, isVerified: true }
    );


    res.status(200).json({ message: 'Please Change your password!' });
  } catch (err) {
    console.error('Error occurred during OTP verification:', err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};

// Resend OTP for Forgot Password
export const resendOtpForgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found!' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpExpiry = Date.now() + 60 * 1000;

    user.forgotOtp = otp;
    user.forgotOtpExpiry = otpExpiry;
    await user.save();

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: 'Resend OTP for Password Reset',
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; border-radius: 10px; max-width: 500px; margin: 0 auto; color: #333;">
          <h4 style="margin-top: 0; color: #4CAF50;">Hi ${user?.name},</h4>
          <h1 style="font-size: 24px; color: #333;">Your OTP code for resetting your password is:
            <strong style="color: #ff5722;">${otp}</strong>
          </h1>
          <p style="line-height: 1.6; font-size: 16px;">Please use this code to reset your password. This OTP is valid for only 60 seconds.</p>
          <p style="margin-top: 20px; line-height: 1.6; font-size: 14px;">Best regards,<br><strong>Your Team</strong></p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'OTP resent for password reset!' });
  } catch (err) {
    console.error('Error in Resend OTP for Forgot Password:', err);
    res.status(500).json({ message: 'Failed to resend OTP for password reset' });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const { password, email } = req.body;

    if (!password || !email) {
      return res.status(400).json({ message: "Password and email are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password should be at least 6 characters long" });
    }

    const foundUser = await UserModel.findOne({ email });

    if (!foundUser) {
      return res.status(404).json({ message: "No user found!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    foundUser.password = hashedPassword;

    await foundUser.save();

    res.status(200).json({ message: "Password updated successfully!" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error, please try again later" });
  }
}
