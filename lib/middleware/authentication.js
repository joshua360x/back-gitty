const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const cookieThatWillBeUsedAsTokenForJWT =
      req.cookie[process.env.COOKIE_NAME];

    const jwtVerififiedUser = jwt.verify(
      cookieThatWillBeUsedAsTokenForJWT,
      process.env.JWT_SECRET
    );
    req.user = jwtVerififiedUser;

    next();
  } catch (error) {
    next(error);
  }
};
