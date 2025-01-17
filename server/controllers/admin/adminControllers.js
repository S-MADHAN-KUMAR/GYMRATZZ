import { adminGenerateToken } from "../../utils/generateToken.js";

export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
      return res.status(400).json({
          success: false,
          message: 'Email and password are required!',
      });
  }


  if (email === 'admin@gmail.com' && password === 'admin@gmail.com') {

    const token = adminGenerateToken(email);

  
      return res.status(200).json({
          success: true,
          message: 'Login successful!',
          admin: { email },
        token
      });
  }

  return res.status(400).json({
      success: false,
      message: 'Incorrect credentials!',
  });
};
