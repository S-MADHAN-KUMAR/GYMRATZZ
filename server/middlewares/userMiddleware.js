import jwt from 'jsonwebtoken';

export const userAuth = (req, res, next) => {

  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; 


  const email = req.headers['x-user-email'];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Token not found' });
  }

  jwt.verify(token, process.env.USER_JWT_SECRET, (err, decoded) => {
    if (err) {
      const message =
        err.name === 'TokenExpiredError'
          ? 'Forbidden: Token expired'
          : 'Forbidden: Invalid token';
      return res.status(403).json({ message });
    }

    req.user = decoded;

    if (email && email !== decoded.email) {
      return res.status(403).json({ message: 'Forbidden: Email mismatch' });
    }

    next();
  });
};
