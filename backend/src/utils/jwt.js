import jwt from 'jsonwebtoken';

export const generateToken = (userId, email, expiresIn, type = 'user') => {
  const ttl = expiresIn || process.env.JWT_EXPIRE || '7d';
  return jwt.sign(
    { userId, email, type },
    process.env.JWT_SECRET,
    { expiresIn: ttl }
  );
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};

export const decodeToken = (token) => {
  return jwt.decode(token);
};
