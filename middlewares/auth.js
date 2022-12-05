const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');
const { JWT_SECRET, NODE_ENV } = require('../config');

function auth(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new AuthError('Необходима авторизация'));
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY2OTg3OTQ5MiwiaWF0IjoxNjY5ODc5NDkyfQ.hfygoNqljHro7HFJVzeEcoiy7EE-mmxw3e25rNK2gxM');
  } catch (err) {
    return next(new AuthError('Необходима авторизация'));
  }
  req.user = payload;
  return next();
}

module.exports = {
  auth,
};
