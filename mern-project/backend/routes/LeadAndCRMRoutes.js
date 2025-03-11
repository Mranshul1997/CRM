const express = require("express");
const router = express.Router();
const leadAndCRMController = require("../controllers/LeadAndCRMController");

router.post("/", leadAndCRMController.createLead);
router.get("/", leadAndCRMController.getLeads);
router.get("/:id", leadAndCRMController.getLeadById);
router.put("/:id", leadAndCRMController.updateLead);
router.delete("/:id", leadAndCRMController.deleteLead);

module.exports = router;
