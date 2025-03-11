import React, { useEffect, useState } from "react";
import LeadTable from "./LeadTable";
import AddLead from "./AddLead";
import { DeleteLeadById, GetAllLeads } from "../../api";
import { ToastContainer } from "react-toastify";
import { notify } from "../../utils";

const LeadCRM = () => {
  const [showModal, setShowModal] = useState(false);
  const [leadObj, setLeadObj] = useState(null);
  const [leadsData, setLeadsData] = useState({
    leads: [],
    pagination: {
      currentPage: 1,
      pageSize: 5,
      totalLeads: 0,
      totalPages: 0,
    },
  });

  const fetchLeads = async (search = "", limit = 5, page = 1) => {
    try {
      const data = await GetAllLeads(search, limit, page);
      setLeadsData(data);
    } catch (err) {
      alert("Error fetching leads", err);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleSearch = (e) => {
    fetchLeads(e.target.value);
  };

  const handleUpdateLead = (lead) => {
    setLeadObj(lead);
    setShowModal(true);
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center w-100 p-3">
      <h1>Lead & CRM Management</h1>
      <div className="w-100 d-flex justify-content-center">
        <div className="w-80 border bg-light p-3">
          <div className="d-flex justify-content-between mb-3">
            <button className="btn btn-primary" onClick={() => setShowModal(true)}>
              Add
            </button>
            <input
              onChange={handleSearch}
              type="text"
              placeholder="Search Leads..."
              className="form-control w-50"
            />
          </div>
          <LeadTable
            leads={leadsData}
            pagination={leadsData?.pagination}
            fetchLeads={fetchLeads}
            handleUpdateLead={handleUpdateLead}
          />
          <AddLead
            fetchLeads={fetchLeads}
            showModal={showModal}
            setShowModal={setShowModal}
            leadObj={leadObj}
          />
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
};

export default LeadCRM;
