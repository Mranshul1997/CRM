import React from "react";
import { Link } from "react-router-dom";
import { DeleteProjectById } from "../../api";
import { notify } from "../../Utils";

function ProjectTable({
  projects,
  pagination = { currentPage: 1, totalPages: 1 },
  fetchProjects,
  handleUpdateProject,
}) {
  const headers = [
    "Name",
    "Description",
    "Start Date",
    "End Date",
    "Status",
    "Actions",
  ];
  const { currentPage, totalPages } = pagination;

  const projectList = Array.isArray(projects)
    ? projects
    : projects?.data && Array.isArray(projects.data.projects)
    ? projects.data.projects
    : [];

  console.log(projects, "<>?<>?<>?<>?");
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePagination(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      handlePagination(currentPage - 1);
    }
  };

  const handlePagination = (page) => {
    fetchProjects("", 5, page);
  };

  const handleDeleteProject = async (id) => {
    try {
      const { success, message } = await DeleteProjectById(id);
      if (success) {
        notify(message, "success");
      } else {
        notify(message, "error");
      }
      fetchProjects();
    } catch (err) {
      console.error(err);
      notify("Failed to delete Project", "error");
    }
  };

  const TableRow = ({ project }) => (
    <tr>
      <td>
        <Link to={`/project/${project._id}`} className="text-decoration-none">
          {project.name}
        </Link>
      </td>
      <td>{project.description}</td>
      <td>{new Date(project.startDate).toLocaleDateString()}</td>
      <td>
        {project.endDate ? new Date(project.endDate).toLocaleDateString() : "-"}
      </td>
      <td>{project.status}</td>
      <td>
        <i
          className="bi bi-pencil-fill text-warning me-4"
          role="button"
          title="Edit"
          onClick={() => handleUpdateProject(project)}
        ></i>
        <i
          className="bi bi-trash-fill text-danger"
          role="button"
          title="Delete"
          onClick={() => handleDeleteProject(project._id)}
        ></i>
      </td>
    </tr>
  );

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <>
      <table className="table table-striped">
        <thead>
          <tr>
            {headers.map((header, idx) => (
              <th key={idx}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {projectList.length === 0 ? (
            <tr>
              <td colSpan={headers.length}>Data Not Found</td>
            </tr>
          ) : (
            projectList.map((proj) => (
              <TableRow project={proj} key={proj._id} />
            ))
          )}
        </tbody>
      </table>

      <div className="d-flex justify-content-between align-items-center my-3">
        <span className="badge bg-primary">
          Page {currentPage} of {totalPages}
        </span>
        <div>
          <button
            className="btn btn-outline-primary me-2"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {pageNumbers.map((page) => (
            <button
              key={page}
              className={`btn btn-outline-primary me-1 ${
                currentPage === page ? "active" : ""
              }`}
              onClick={() => handlePagination(page)}
            >
              {page}
            </button>
          ))}
          <button
            className="btn btn-outline-primary ms-2"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default ProjectTable;
