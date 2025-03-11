// src/Components/Timesheet/TimesheetTable.js
import React from "react";
import { DeleteTimesheetById } from "../../api";
import { notify } from "../../Utils";

function TimesheetTable({
  timesheets,
  pagination = { currentPage: 1, totalPages: 1 },
  fetchTimesheets,
  handleUpdateTimesheet,
}) {
  const headers = [
    "Employee Name",
    "Project ID",
    "Date",
    "Hours",
    "Description",
    "Actions",
  ];
  const { currentPage, totalPages } = pagination;

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePagination(currentPage + 1);
    }
  };

  // Normalize timesheet data in case it's wrapped inside a "data" object
  const timeSheetList = Array.isArray(timesheets)
    ? timesheets
    : timesheets?.data && Array.isArray(timesheets.data.timesheets)
    ? timesheets.data.timesheets
    : [];

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      handlePagination(currentPage - 1);
    }
  };

  const handlePagination = (page) => {
    fetchTimesheets("", 5, page);
  };

  const handleDeleteTimesheet = async (id) => {
    try {
      const { success, message } = await DeleteTimesheetById(id);
      if (success) {
        notify(message, "success");
      } else {
        notify(message, "error");
      }
      fetchTimesheets();
    } catch (err) {
      console.error(err);
      notify("Failed to delete Timesheet", "error");
    }
  };

  const TableRow = ({ timesheet }) => (
    <tr>
      {/* Display employee name; if not available, show "Unknown Employee" */}
      <td>{timesheet.employee?.name || "Unknown Employee"}</td>
      <td>{timesheet.project?.name || timesheet.project}</td>
      <td>{new Date(timesheet.date).toLocaleDateString()}</td>
      <td>{timesheet.hours}</td>
      <td>{timesheet.description}</td>
      <td>
        <i
          className="bi bi-pencil-fill text-warning me-4"
          role="button"
          title="Edit"
          onClick={() => handleUpdateTimesheet(timesheet)}
        ></i>
        <i
          className="bi bi-trash-fill text-danger"
          role="button"
          title="Delete"
          onClick={() => handleDeleteTimesheet(timesheet._id)}
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
          {timeSheetList.length === 0 ? (
            <tr>
              <td colSpan={headers.length}>Data Not Found</td>
            </tr>
          ) : (
            timeSheetList.map((ts) => <TableRow timesheet={ts} key={ts._id} />)
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

export default TimesheetTable;
