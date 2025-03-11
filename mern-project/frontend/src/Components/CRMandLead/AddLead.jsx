import React, { useEffect, useState } from "react";
import { notify } from "../../Utils";
import { CreateLead, UpdateLeadById } from "../../api";

function AddLead({ showModal, setShowModal, fetchLeads, leadObj }) {
  const [lead, setLead] = useState({
    name: "",
    email: "",
    phone: "",
    source: "",
    status: "New",
    notes: "",
  });
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    if (leadObj) {
      setLead(leadObj);
      setUpdateMode(true);
    }
  }, [leadObj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLead({ ...lead, [name]: value });
  };

  const resetLeadStates = () => {
    setLead({
      name: "",
      email: "",
      phone: "",
      source: "",
      status: "New",
      notes: "",
    });
  };

  const handleAddLead = async (e) => {
    e.preventDefault();
    try {
      const { success, message } = updateMode
        ? await UpdateLeadById(lead, lead._id)
        : await CreateLead(lead);
      if (success) {
        notify(message, "success");
      } else {
        notify(message, "error");
      }
      setShowModal(false);
      resetLeadStates();
      fetchLeads();
      setUpdateMode(false);
    } catch (err) {
      console.error(err);
      notify("Failed to create/update Lead", "error");
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setUpdateMode(false);
    resetLeadStates();
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
              {updateMode ? "Update Lead" : "Add Lead"}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={handleModalClose}
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleAddLead}>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={lead.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={lead.email}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Phone</label>
                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  value={lead.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Source</label>
                <input
                  type="text"
                  className="form-control"
                  name="source"
                  value={lead.source}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Status</label>
                <select
                  className="form-control"
                  name="status"
                  value={lead.status}
                  onChange={handleChange}
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Qualified">Qualified</option>
                  <option value="Lost">Lost</option>
                  <option value="Converted">Converted</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Notes</label>
                <textarea
                  className="form-control"
                  name="notes"
                  value={lead.notes}
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

export default AddLead;
