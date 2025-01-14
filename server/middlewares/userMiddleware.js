import jwt from 'jsonwebtoken';

export const userAuth = (req, res, next) => {

  const token = req.cookies.USER_TOKEN;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Token not found' });
  }

  jwt.verify(token, process.env.USER_JWT_SECRET, (err, decoded) => {
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
