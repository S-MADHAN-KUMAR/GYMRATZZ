import jwt from 'jsonwebtoken';

export const userAuth = (req, res, next) => {
  // Get token from Authorization header
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; // 'Bearer <token>'

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Token not found' });
  }

  console.log(token);
  

  jwt.verify(token, process.env.USER_JWT_SECRET, (err, decoded) => {
    if (err) {
      const message =
        err.name === 'TokenExpiredError'
          ? 'Forbidden: Token expired'
          : 'Forbidden: Invalid token';
      return res.status(403).json({ message });
    }

    // Attach user info to the request object
    req.user = decoded;
    next();
  });
};
