const express = require("express");
const router = express.Router();
const timesheetController = require("../controllers/TimesheetController");

router.post("/", timesheetController.createTimesheet);
router.get("/", timesheetController.getTimesheets);
router.get("/:id", timesheetController.getTimesheetById);
router.put("/:id", timesheetController.updateTimesheet);
router.delete("/:id", timesheetController.deleteTimesheet);

module.exports = router;
