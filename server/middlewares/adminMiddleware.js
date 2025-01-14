import jwt from 'jsonwebtoken';

export const adminAuth = (req, res, next) => {
  const token = req.cookies.ADMIN_TOKEN

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Token not found' })
  }


  jwt.verify(token, process.env.ADMIN_JWT_SECRET, (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(403).json({ message: 'Forbidden: Token expired' });
      }
      return res.status(403).json({ message: 'Forbidden: Invalid token' });
    }

    req.user = decoded;

    const currentTime = Math.floor(Date.now() / 1000);
    if (decoded.exp < currentTime) {
      return res.status(403).json({ message: 'Forbidden: Token expired' });
    }

    next();
  });
};
