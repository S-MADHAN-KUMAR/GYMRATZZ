import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import adminRoutes from './routes/adminRoutes.js'
import userRoutes from './routes/userRoutes.js'
import connectDB from './config/mongoDB.js';
import cloudinaryConfig from './config/cloudinary.js'
import cookieParser from 'cookie-parser';

dotenv.config()
const app = express()
const PORT =  process.env.PORT
app.use(express.json())
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }))
app.use(cors({
  origin: process.env.FRONTEND_URL, 
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  credentials: true, 
  allowedHeaders: ["Content-Type", "Authorization",'x-user-email'], 
}));

//======================config=========================//

connectDB()
cloudinaryConfig()

//=======================Routes=========================//

// Admin Routes
app.use('/admin',adminRoutes)
 
// User Routes
app.use('/user',userRoutes)

//========================================================//

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
