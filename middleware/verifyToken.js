const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, "hello");
    req.user = { _id: decoded.id }; // <--- Update this line
    next();
  } catch (err) {
    res.status(401).send({ message: 'Please authenticate' });
  }
};

module.exports = verifyToken;
