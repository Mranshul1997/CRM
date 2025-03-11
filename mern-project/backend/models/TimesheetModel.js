const mongoose = require("mongoose");

const timesheetSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "employees",
      required: true,
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },

    date: { type: Date, required: true },
    hours: { type: Number, required: true },
    description: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Timesheet", timesheetSchema);
