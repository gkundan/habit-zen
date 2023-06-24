const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect("/sign-in");
};

module.exports = { ensureAuthenticated };
