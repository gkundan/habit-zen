const User = require("../models/UserSchema");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

// Home view
exports.home = (req, res) => {
  res.render("home", {
    title: "Welcome to Habit Zone",
    messages: {
      error: req.flash("error"),
      success: req.flash("success"),
    },
  });
};

// Sign-in Page
exports.signIn = (req, res) => {
  res.render("sign_in", {
    title: "Welcome to Habit Zone",
    messages: {
      error: req.flash("error"),
      success: req.flash("success"),
    },
  });
};


//user sign up
exports.createUser = async (req, res) => {
  try {
    // ...

    req.flash("success", "User created successfully!");
    return res.redirect("/sign-in");
  } catch (err) {
    console.error(err);
    req.flash("error", "Internal server error.");
    return res.status(500).json({ message: "Internal server error" });
  }
};

//user log in
exports.logIn = function (req, res, next) {
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      req.flash("error", info.message);
      return res.redirect("back");
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }

      // Set the user ID in the session
      req.session.userId = user._id;

      return res.redirect("/habitList");
    });
  })(req, res, next);
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/sign-in");
    }
  });
};

//google
exports.googleSignUp = (req, res) => {
  res.send("Update Incoming!!");
};
