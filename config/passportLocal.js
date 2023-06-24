const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/UserSchema");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      User.findOne({ email: email })
        .then((user) => {
          if (!user) {
            return done(null, false, { message: "Incorrect email." });
          }
          user.comparePassword(password, (err, isMatch) => {
            if (err) return done(err);
            if (!isMatch)
              return done(null, false, { message: "Incorrect password." });
            return done(null, user);
          });
        })
        .catch((err) => done(err));
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id)
      .then((user) => {
        done(null, user);
      })
      .catch((err) => {
        done(err, null);
      });
  });
};
