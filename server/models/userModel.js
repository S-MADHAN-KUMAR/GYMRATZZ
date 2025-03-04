import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }, 
  phoneNumber: { type: Number, }, 
  status: { type : Boolean , default:true },
  profilePicture: { type: String },
  otp: { type: Number }, 
  otpExpiry: { type: Date },
  forgotOtp: { type: Number }, 
  forgotOtpExpiry: { type: Date },
  isVerified: { type: Boolean, default: false },
  wishlist:[{
    productId:{type:mongoose.Schema.Types.ObjectId}
  }]
}, {
  timestamps: true,
});

const UserModel = mongoose.model('Users', UserSchema);
export default UserModel;
