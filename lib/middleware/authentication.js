const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const cookieThatWillBeUsedAsTokenForJWT =
      req.cookies[process.env.COOKIE_NAME];
    // console.log(
    //   '🚀 ~ file: authentication.js ~ line 6 ~ cookieThatWillBeUsedAsTokenForJWT',
    //   req.cookies
    // );

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
