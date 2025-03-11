import React, { useEffect, useState } from "react";
import ProjectTable from "./ProjectTable";
import AddProject from "./AddProject";
import { DeleteProjectById, GetAllProjects } from "../../api";
import { ToastContainer } from "react-toastify";
import { notify } from "../../utils";

const ProjectManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const [projectObj, setProjectObj] = useState(null);
  const [projectsData, setProjectsData] = useState({
    pagination: {
      currentPage: 1,
      pageSize: 5,
      totalProjects: 0,
      totalPages: 0,
    },
  });
  console.log(projectsData, "000000000000000");

  const fetchProjects = async (search = "", limit = 5, page = 1) => {
    try {
      const data = await GetAllProjects(search, limit, page);
      setProjectsData(data);
    } catch (err) {
      alert("Error fetching projects", err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleSearch = (e) => {
    fetchProjects(e.target.value);
  };

  const handleUpdateProject = (project) => {
    setProjectObj(project);
    setShowModal(true);
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center w-100 p-3">
      <h1>Project Management</h1>
      <div className="w-100 d-flex justify-content-center">
        <div className="w-80 border bg-light p-3">
          <div className="d-flex justify-content-between mb-3">
            <button
              className="btn btn-primary"
              onClick={() => setShowModal(true)}
            >
              Add
            </button>
            <input
              onChange={handleSearch}
              type="text"
              placeholder="Search Projects..."
              className="form-control w-50"
            />
          </div>
          <ProjectTable
            projects={projectsData || []}
            pagination={projectsData?.pagination}
            fetchProjects={fetchProjects}
            handleUpdateProject={handleUpdateProject}
          />
          <AddProject
            fetchProjects={fetchProjects}
            showModal={showModal}
            setShowModal={setShowModal}
            projectObj={projectObj}
          />
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
    </div>
  );
};

export default ProjectManagement;
