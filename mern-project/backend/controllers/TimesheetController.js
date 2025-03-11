const Timesheet = require("../models/TimesheetModel");

exports.createTimesheet = async (req, res) => {
  try {
    const newTimesheet = await Timesheet.create(req.body);
    res.status(201).json(newTimesheet);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getTimesheets = async (req, res) => {
  try {
    // Adjust query/pagination as needed
    const timesheets = await Timesheet.find()
      .populate("employee", "name")  // Populates employee name only
      .populate("project", "name");  // Populates project name only

    // For simplicity, pagination is omitted here
    res.status(200).json({ data: { timesheets }, pagination: { currentPage: 1, totalPages: 1 } });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
exports.getTimesheetById = async (req, res) => {
  try {
    const timesheet = await Timesheet.findById(req.params.id);
    if (!timesheet)
      return res.status(404).json({ message: "Timesheet not found" });
    res.status(200).json(timesheet);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateTimesheet = async (req, res) => {
  try {
    const timesheet = await Timesheet.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!timesheet)
      return res.status(404).json({ message: "Timesheet not found" });
    res.status(200).json(timesheet);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteTimesheet = async (req, res) => {
  try {
    const timesheet = await Timesheet.findByIdAndDelete(req.params.id);
    if (!timesheet)
      return res.status(404).json({ message: "Timesheet not found" });
    res.status(200).json({ message: "Timesheet deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
