const EmployeeModal = require("../models/EmployeeModel");

const createEmployee = async (req, res) => {
  try {
    const body = req.body;
    body.profileImage = req.file ? req.file?.path : null;
    console.log(body, "BodyMon");
    const emp = new EmployeeModal(body);
    await emp.save();
    res.status(201).json({
      message: "Employee created successfully",
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: err.message,
    });
  }
};

const updateEmployeeById = async (req, res) => {
  try {
    const { name, email, phone, salary, department } = req.body;
    const { id } = req.params;

    let updateData = {
      name,
      email,
      phone,
      salary,
      department,
      updatedAt: new Date(),
    };

    if (req.file) {
      updateData.profileImage = req.file?.path;
    }

    const updateEmployee = await EmployeeModal.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );
    if (!updateEmployee) {
      return res.status(404).json({
        message: "Employee not found",
        success: false,
      });
    }

    res.status(200).json({
      message: "Employee updated successfully",
      success: true,
      data: updateEmployee,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: err,
    });
  }
};

const getAllEmployees = async (req, res) => {
  try {
    let { page, limit, search } = req.query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 5;

    const skip = (page - 1) * limit;
    // page =>1 (1-1)*5 = 0 skip
    // page =>2 (2-1)*5 = 5 skip
    // page =>3 (3-1)*5 = 10 skip

    let searchCriteria = {};
    if (search) {
      searchCriteria = {
        name: {
          $regex: search,
          $options: "i", // 'i' for case-insensitive
        },
      };
    }
    const totalEmployees = await EmployeeModal.countDocuments(searchCriteria);

    const emps = await EmployeeModal.find(searchCriteria)
      .skip(skip)
      .limit(limit)
      .sort({ updatedAt: -1 });

    const totalPages = Math.ceil(totalEmployees / limit);

    res.status(200).json({
      message: "All Employee",
      success: true,
      data: {
        employees: emps,
        pagination: {
          totalEmployees,
          currentPage: page,
          totalPages,
          pageSize: limit,
        },
      },
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: err,
    });
  }
};

const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const emp = await EmployeeModal.findOne({ _id: id });
    console.log(emp, "message");
    res.status(200).json({
      message: "Get Employee Details",
      success: true,
      data: emp,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: err,
    });
  }
};

const deleteEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const emp = await EmployeeModal.findByIdAndDelete({ _id: id });
    console.log(emp, "message");
    res.status(200).json({
      message: "Employee Deleted",
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: err,
    });
  }
};

module.exports = {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  deleteEmployeeById,
  updateEmployeeById,
};
