// src/Components/Timesheet/TimeSheetManagement.js
import React, { useEffect, useState } from "react";
import TimesheetTable from "./TimesheetTable";
import AddTimesheet from "./AddTimesheet";
import { GetAllTimesheets } from "../../api";
import { ToastContainer } from "react-toastify";

const TimeSheetManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const [timesheetObj, setTimesheetObj] = useState(null);
  const [timesheetsData, setTimesheetsData] = useState({
    timesheets: [],
    pagination: {
      currentPage: 1,
      pageSize: 5,
      totalTimesheets: 0,
      totalPages: 0,
    },
  });

  const fetchTimesheets = async (search = "", limit = 5, page = 1) => {
    try {
      const data = await GetAllTimesheets(search, limit, page);
      setTimesheetsData(data);
    } catch (err) {
      alert("Error fetching timesheets", err);
    }
  };

  useEffect(() => {
    fetchTimesheets();
  }, []);

  const handleSearch = (e) => {
    fetchTimesheets(e.target.value);
  };

  const handleUpdateTimesheet = (timesheet) => {
    setTimesheetObj(timesheet);
    setShowModal(true);
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center w-100 p-3">
      <h1>Timesheet Management</h1>
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
              placeholder="Search Timesheets..."
              className="form-control w-50"
            />
          </div>
          <TimesheetTable
            timesheets={timesheetsData}
            pagination={timesheetsData?.pagination}
            fetchTimesheets={fetchTimesheets}
            handleUpdateTimesheet={handleUpdateTimesheet}
          />
          <AddTimesheet
            fetchTimesheets={fetchTimesheets}
            showModal={showModal}
            setShowModal={setShowModal}
            timesheetObj={timesheetObj}
          />
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
};

export default TimeSheetManagement;
