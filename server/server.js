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
const PORT =  3000
app.use(express.json())
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }))
app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);
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
