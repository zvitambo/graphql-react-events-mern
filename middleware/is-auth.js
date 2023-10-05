module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    req.isAuth = false;
    return next();
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    req.isAuth = false;
    return next();
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (!payload) {
      req.isAuth = false;
      return next();
    }
    req.isAuth = true;
    req.userId = payload.userId;
    next();
  } catch (error) {
    req.isAuth = false;
    return next();
  }
};
