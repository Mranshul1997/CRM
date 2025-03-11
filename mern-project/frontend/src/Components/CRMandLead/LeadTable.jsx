import React from "react";
import { DeleteLeadById } from "../../api";
import { notify } from "../../Utils";

function LeadTable({
  leads,
  pagination = { currentPage: 1, totalPages: 1 },
  fetchLeads,
  handleUpdateLead,
}) {
  const headers = [
    "Name",
    "Email",
    "Phone",
    "Source",
    "Status",
    "Notes",
    "Actions",
  ];
  const { currentPage, totalPages } = pagination;

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePagination(currentPage + 1);
    }
  };

  const Leads = Array.isArray(leads)
    ? leads
    : leads?.data && Array.isArray(leads.data.leads)
    ? leads.data.leads
    : [];

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      handlePagination(currentPage - 1);
    }
  };

  const handlePagination = (page) => {
    fetchLeads("", 5, page);
  };

  const handleDeleteLead = async (id) => {
    try {
      const { success, message } = await DeleteLeadById(id);
      if (success) {
        notify(message, "success");
      } else {
        notify(message, "error");
      }
      fetchLeads();
    } catch (err) {
      console.error(err);
      notify("Failed to delete Lead", "error");
    }
  };

  const TableRow = ({ lead }) => (
    <tr>
      <td>{lead.name}</td>
      <td>{lead.email}</td>
      <td>{lead.phone}</td>
      <td>{lead.source}</td>
      <td>{lead.status}</td>
      <td>{lead.notes}</td>
      <td>
        <i
          className="bi bi-pencil-fill text-warning me-4"
          role="button"
          title="Edit"
          onClick={() => handleUpdateLead(lead)}
        ></i>
        <i
          className="bi bi-trash-fill text-danger"
          role="button"
          title="Delete"
          onClick={() => handleDeleteLead(lead._id)}
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
          {Leads?.length === 0 ? (
            <tr>
              <td colSpan={headers.length}>Data Not Found</td>
            </tr>
          ) : (
            Leads?.map((ld) => <TableRow lead={ld} key={ld._id} />)
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

export default LeadTable;
