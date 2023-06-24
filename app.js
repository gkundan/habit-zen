const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const flash = require("connect-flash");
const connectDB = require("./config/db");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");
const habitRoutes = require("./routes/habitRoutes");
const expressLayouts = require("express-ejs-layouts");
const cookieParser = require("cookie-parser");
const LocalStrategy = require("passport-local").Strategy;
const passportLocal = require("./config/passportLocal");
const passport = require("passport");

// Connect to MongoDB
connectDB();

// Set up view engine and static files
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "assets")));

// Set up body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set up session middleware
app.use(
  session({
    secret: "HabitTrain",
    resave: false,
    saveUninitialized: false,
  })
);

// Set up flash messages middleware
app.use(flash());

// Set up passport middleware
app.use(passport.initialize());
app.use(passport.session());
passportLocal(passport);

// Set up express layouts middleware
app.use(expressLayouts);

// Set up cookie parser middleware
app.use(cookieParser());

// Custom middleware for logging
app.use((req, res, next) => {
  console.log("Routing");
  next();
});

// Set up routes
app.use("/", habitRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
