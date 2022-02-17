import jwt from 'jsonwebtoken';

const { SALT } = process.env;

const checkAuth = (req, res, next) => {
  try {
    const authToken = req.header('Authorization').replace('Bearer ', '');
    const userInfo = jwt.verify(authToken, SALT);
    req.userInfo = userInfo;
    next();
  } catch (err) {
    res.status(403).json({ err });
  }
};

export default checkAuth;
