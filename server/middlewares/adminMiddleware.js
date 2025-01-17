import jwt from 'jsonwebtoken';

export const adminAuth = (req, res, next) => {
  // Extract the token from the Authorization header
  const token = req.headers.authorization?.split(' ')[1];  // 'Bearer <token>'

  console.log('Token extracted:', token);

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Token not found' });
  }

  // Verify the JWT token
  jwt.verify(token, process.env.ADMIN_JWT_SECRET, (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(403).json({ message: 'Forbidden: Token expired' });
      }
      return res.status(403).json({ message: 'Forbidden: Invalid token' });
    }

    // If emails match, proceed to the next middleware
    next();
  });
};
