const express = require("express");
const {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  deleteEmployeeById,
  updateEmployeeById,
} = require("../controllers/EmployeesController");
const { cloudinaryFileUploader } = require("../middlewares/FileUploader");
const routes = express.Router();

routes.get("/", getAllEmployees);

routes.post("/", cloudinaryFileUploader.single("profileImage"), createEmployee);

routes.put("/:id", cloudinaryFileUploader.single("profileImage"), updateEmployeeById);

routes.get("/:id", getEmployeeById);

routes.delete("/:id", deleteEmployeeById);


module.exports = routes;
