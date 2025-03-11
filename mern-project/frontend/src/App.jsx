import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import EmployeeManagement from "./Components/Employee/EmployeeManagement";
import EmployeeDetails from "./Components/Employee/EmployeeDetails";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import Dashboard from "./Components/Dashboard/Dashboard";
import ProjectManagement from "./Components/Project/ProjectManagement";
import LeadCRM from "./Components/CRMandLead/LeadCRM";
import TimeSheetManagement from "./Components/Timesheet/TimeSheetManagement";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Dashboard as a parent route */}
        <Route path="/dashboard" element={<Dashboard />}>
          {/* Default dashboard view can be EmployeeManagement */}
          <Route index element={<EmployeeManagement />} />
          <Route path="employee" element={<EmployeeManagement />} />
          <Route path="employee/:id" element={<EmployeeDetails />} />
          <Route path="project" element={<ProjectManagement />} />
          <Route path="lead" element={<LeadCRM />} />
          <Route path="timesheet" element={<TimeSheetManagement />} />
          {/* Redirect any unknown dashboard routes back to dashboard index */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>

        {/* Optional: Redirect any unknown route to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
