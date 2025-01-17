import jwt from 'jsonwebtoken';

export const userAuth = (req, res, next) => {
  // Extract the token from cookies
  const token = req.cookies.USER_TOKEN;

  console.log('Token extracted:', token);

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Token not found' });
  }

  // Verify the JWT token
  jwt.verify(token, process.env.USER_JWT_SECRET, (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(403).json({ message: 'Forbidden: Token expired' });
      }
      return res.status(403).json({ message: 'Forbidden: Invalid token' });
    }

    // Token is valid, attach decoded user info to the request object
    req.user = decoded;

    next();
  });
};
