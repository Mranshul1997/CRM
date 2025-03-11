import React, { useEffect, useState } from "react";
import { notify } from "../../utils";
import { CreateProject, UpdateProjectById } from "../../api";

function AddProject({ showModal, setShowModal, fetchProjects, projectObj }) {
  const [project, setProject] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    status: "Planned",
  });
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    if (projectObj) {
      setProject(projectObj);
      setUpdateMode(true);
    }
  }, [projectObj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject({ ...project, [name]: value });
  };

  const resetProjectStates = () => {
    setProject({
      name: "",
      description: "",
      startDate: "",
      endDate: "",
      status: "Planned",
    });
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    try {
      const { success, message } = updateMode
        ? await UpdateProjectById(project, project._id)
        : await CreateProject(project);
      if (success) {
        notify(message, "success");
      } else {
        notify(message, "error");
      }
      setShowModal(false);
      resetProjectStates();
      fetchProjects();
      setUpdateMode(false);
    } catch (err) {
      console.error(err);
      notify("Failed to create/update Project", "error");
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setUpdateMode(false);
    resetProjectStates();
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
              {updateMode ? "Update Project" : "Add Project"}
            </h5>
            <button type="button" className="btn-close" onClick={handleModalClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleAddProject}>
              <div className="mb-3">
                <label className="form-label">Project Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={project.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  name="description"
                  value={project.description}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Start Date</label>
                <input
                  type="date"
                  className="form-control"
                  name="startDate"
                  value={project.startDate}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">End Date</label>
                <input
                  type="date"
                  className="form-control"
                  name="endDate"
                  value={project.endDate}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Status</label>
                <select
                  className="form-control"
                  name="status"
                  value={project.status}
                  onChange={handleChange}
                >
                  <option value="Planned">Planned</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
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

export default AddProject;
