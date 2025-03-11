const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    status: {
      type: String,
      enum: ["Planned", "In Progress", "Completed"],
      default: "Planned",
    },
    employees: [{ type: mongoose.Schema.Types.ObjectId, ref: "Employee" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
