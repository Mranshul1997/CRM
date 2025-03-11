// src/Components/Timesheet/AddTimesheet.js
import React, { useEffect, useState } from "react";
import { notify } from "../../utils";
import { 
  CreateTimesheet, 
  UpdateTimesheetById, 
  GetAllEmployees, 
  GetAllProjects 
} from "../../api";

function AddTimesheet({ showModal, setShowModal, fetchTimesheets, timesheetObj }) {
  const [timesheet, setTimesheet] = useState({
    employee: "",
    project: "",
    date: "",
    hours: "",
    description: "",
  });
  const [updateMode, setUpdateMode] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [projects, setProjects] = useState([]);

  // Default projects related to web development (with valid ObjectId-like strings)
  const defaultProjects = [
    { _id: "6123456789abcdef01234567", name: "React Development" },
    { _id: "6123456789abcdef01234568", name: "Angular Development" },
    { _id: "6123456789abcdef01234569", name: "Vue.js Development" },
    { _id: "6123456789abcdef0123456a", name: "Node.js Backend" },
  ];
  
  useEffect(() => {
    if (timesheetObj) {
      setTimesheet(timesheetObj);
      setUpdateMode(true);
    }
  }, [timesheetObj]);

  // Fetch valid employees and projects for dropdowns
  useEffect(() => {
    const fetchData = async () => {
      try {
        const empData = await GetAllEmployees();
        const projData = await GetAllProjects();
        // Adjust based on your API response structure
        setEmployees(empData?.data?.employees || []);
        setProjects(
          (projData?.data?.projects && projData.data.projects.length > 0)
            ? projData.data.projects
            : defaultProjects
        );
      } catch (error) {
        console.error("Error fetching employees or projects", error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTimesheet({ ...timesheet, [name]: value });
  };

  const resetTimesheetStates = () => {
    setTimesheet({
      employee: "",
      project: "",
      date: "",
      hours: "",
      description: "",
    });
  };

  const handleAddTimesheet = async (e) => {
    e.preventDefault();
    try {
      const { success, message } = updateMode
        ? await UpdateTimesheetById(timesheet, timesheet._id)
        : await CreateTimesheet(timesheet);
      if (success) {
        notify(message, "success");
      } else {
        notify(message, "error");
      }
      setShowModal(false);
      resetTimesheetStates();
      fetchTimesheets();
      setUpdateMode(false);
    } catch (err) {
      console.error(err);
      notify("Failed to create/update Timesheet", "error");
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setUpdateMode(false);
    resetTimesheetStates();
  };

  return (
    <div
      className={`modal ${showModal ? "d-block" : ""}`}
      tabIndex="-1"
      role="dialog"
      style={{ display: showModal ? "block" : "none" }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {updateMode ? "Update Timesheet" : "Add Timesheet"}
            </h5>
            <button type="button" className="btn-close" onClick={handleModalClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleAddTimesheet}>
              <div className="mb-3">
                <label className="form-label">Employee</label>
                <select
                  className="form-control"
                  name="employee"
                  value={timesheet.employee}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Employee</option>
                  {employees.map((emp) => (
                    <option key={emp._id} value={emp._id}>
                      {emp.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Project</label>
                <select
                  className="form-control"
                  name="project"
                  value={timesheet.project}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Project</option>
                  {projects.map((proj) => (
                    <option key={proj._id} value={proj._id}>
                      {proj.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Date</label>
                <input
                  type="date"
                  className="form-control"
                  name="date"
                  value={timesheet.date}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Hours</label>
                <input
                  type="number"
                  className="form-control"
                  name="hours"
                  value={timesheet.hours}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  name="description"
                  value={timesheet.description}
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                {updateMode ? "Update" : "Save"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddTimesheet;
