const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  category: {
    type: String,
    enum: ["gym", "exercise", "play", "swimming", "study", "walking", "custom"],
    required: true,
  },
  customCategoryName: {
    type: String,
    default: "",
  },
  status: [
    {
      date: {
        type: Date,
        default: Date.now,
      },
      value: {
        type: String,
        enum: ["Done", "Not Done", "No Action"],
        default: "None",
      },
    },
  ],
  log: [
    {
      action: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const Habit = mongoose.model("Habit", habitSchema);

module.exports = Habit;
