const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const PORT = process.env.PORT || 7001;
require("./models/db");

// Existing routes
const EmployeesRouter = require("./routes/EmployeeRoutes");
const AuthRouter = require("./routes/AuthRoutes");

// New routes
const projectRoutes = require("./routes/ProjectRoutes");
const timesheetRoutes = require("./routes/TimesheetRoutes");
const leadAndCRMRoutes = require("./routes/LeadAndCRMRoutes");

app.use(cors());
app.use(bodyParser.json());

app.use("/api/auth", AuthRouter);

app.get("/", (req, res) => {
  res.send("Server is up and running!");
});

// Route registrations
app.use("/api/employees", EmployeesRouter);
app.use("/api/auth", AuthRouter);
app.use("/api/projects", projectRoutes);
app.use("/api/timesheets", timesheetRoutes);
app.use("/api/leads", leadAndCRMRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
