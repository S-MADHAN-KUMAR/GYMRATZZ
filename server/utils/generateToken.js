import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config()

export const userGenerateToken = (email ) => {
  const tokenKey = process.env.USER_JWT_SECRET;

  const token = jwt.sign(
    { email,role: 'user' }, 
    tokenKey,            
    { expiresIn: process.env.JWT_EXPIRES_IN || '30d' }  
  );

  return token;
};


export const adminGenerateToken = (email ) => {
  const tokenKey = process.env.ADMIN_JWT_SECRET


  const token = jwt.sign(
    { email, role:'admin' }, 
    tokenKey,            
    { expiresIn: process.env.JWT_EXPIRES_IN || '30d' }  
  );

  return token;
};


