const Habit = require("../models/habitSchema");
const moment = require("moment");

// Controller function to render the list of habits
exports.habitList = async (req, res, next) => {
  try {
    // Check if user is logged in
    if (!req.session.userId) {
      return res.redirect("/sign-in");
    }

    // Retrieve habits for the logged-in user
    const habits = await Habit.find({ userId: req.session.userId });

    return res.render("habitList", {
      title: "Your Habits",
      habits: habits,
      user: req.user,
      messages: {
        error: req.flash("error"),
        success: req.flash("success"),
      },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};


// Controller function to handle creating a new habit
exports.newHabit = async (req, res) => {
  try {
    if (!req.user) {
      // If user is not authenticated, redirect to login page
      return res.redirect("/login");
    }

    const userId = req.user._id;
    const habitData = { ...req.body, userId };
    const habit = new Habit(habitData);
    await habit.save();
    req.flash("success", "New Habit Created!");
    res.redirect("back");
  } catch (error) {
    console.error(error);
    res.redirect("back");
  }
};

// Controller function to handle deleting a habit
exports.deleteHabit = async (req, res, next) => {
  try {
    const habit = await Habit.findByIdAndDelete(req.params.id);

    if (!habit) {
      req.flash("error", "Habit not found!");
      return res.status(404).send("Habit not found");
    }

    req.flash("error", "Habit Deleted!");
    res.redirect("back");
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// Controller function to render the habit log page
exports.habitLog = async (req, res, next) => {
  try {
    const habit = await Habit.findById(req.params.id);

    if (!habit) {
      req.flash("error", "Habit not found!");
      return res.status(404).send("Habit not found");
    }

    const entries = habit.log.map((entry) => ({
      title:
        entry.action === "Done" ? "✓" : entry.action === "Not Done" ? "X" : "-",
      start: moment(entry.date).toDate(),
      end: moment(entry.date).add(1, "days").toDate(),
    }));

    const log = entries.map((entry) => ({
      title: `${habit.name} - ${habit.category} - ${entry.title}`,
      start: entry.start,
      className:
        entry.title === "✓"
          ? "done"
          : entry.title === "X"
          ? "not-done"
          : "no-action",
    }));

    console.log("Habit Log From Controller", log);
    res.render("habit_log", {
      title: `${habit.category} Log`,
      habit,
      log,
      moment,
      user: req.user,
      messages: req.flash(),
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// Controller function to add a new habit log entry// Controller function to add a new habit log entry
exports.addHabitLog = async (req, res, next) => {
  try {
    const habit = await Habit.findById(req.params.id);
    if (!habit) {
      req.flash("error", "Habit not found");
      return res.redirect("back");
    }

    const { date, action } = req.body;
    const logEntry = {
      action,
      date: moment(date).toDate(),
    };

    // Check if an entry already exists for the given date
    const existingEntry = habit.log.find((entry) =>
      moment(entry.date).isSame(moment(date), "day")
    );
    if (existingEntry) {
      req.flash("error", "An entry already exists for this date");
      return res.redirect(`/habit/${habit._id}/log`);
    }
    req.flash("Success", "An entry Added to Your Log!!");

    habit.log.push(logEntry);
    await habit.save();
    req.flash("Success", "An entry Added to Your Log!!");

    res.redirect(`/habit/${habit._id}/log`);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
