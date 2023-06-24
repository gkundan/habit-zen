const express = require("express");
const router = express.Router();
const habitController = require("../controller/habitConroller");
const habitListController = require("../controller/habitListController");
const { ensureAuthenticated } = require("../config/auth");

/************  Get Routs       ****** */
// Define the routes for handling habit-view related requests
router.get("/", function (req, res) {
  habitController.home(req, res);
});
// /sign in
router.get("/sign-in", habitController.signIn);
router.get("/sing-in-google", function (req, res) {
  habitController.googleSignUp(req, res);
});
//rendering the list
router.get("/habitList", ensureAuthenticated, habitListController.habitList);

// Route to show habit log page
router.get("/habit/:id/log", ensureAuthenticated, function (req, res) {
  habitListController.habitLog(req, res);
});

//delete
router.get("/habit/:id/delete", function (req, res) {
  habitListController.deleteHabit(req, res);
});
router.get("/logout", habitController.logout);

/************  Post Routs       ****** */

// Define the routes for handling habit-post related requests
router.post("/create-user", function (req, res) {
  habitController.createUser(req, res);
});
router.post("/signIn-user", function (req, res) {
  habitController.logIn(req, res);
});
router.post("/habit/create", ensureAuthenticated, function (req, res) {
  habitListController.newHabit(req, res);
});
// Route to handle adding log entries
// Route to handle adding log entries
router.post("/habit/:id/log", function (req, res) {
  habitListController.addHabitLog(req, res);
});
//
router.post("/habit/:habitId/log/:entryId/update", function (req, res) {
  habitListController.log_update(req, res);
});

// Export the router for use in the app
module.exports = router;
