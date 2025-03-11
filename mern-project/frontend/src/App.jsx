import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Lazy Loading Components
const Login = lazy(() => import("./Components/Auth/Login"));
const Register = lazy(() => import("./Components/Auth/Register"));
const Dashboard = lazy(() => import("./Components/Dashboard/Dashboard"));
const EmployeeManagement = lazy(() =>
  import("./Components/Employee/EmployeeManagement")
);
const EmployeeDetails = lazy(() =>
  import("./Components/Employee/EmployeeDetails")
);
const ProjectManagement = lazy(() =>
  import("./Components/Project/ProjectManagement")
);
const LeadCRM = lazy(() => import("./Components/CRMandLead/LeadCRM"));
const TimeSheetManagement = lazy(() =>
  import("./Components/Timesheet/TimeSheetManagement")
);

const App = () => {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div
            style={{
              height: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.5rem",
              fontWeight: "bold",
            }}
          >
            Loading...
          </div>
        }
      >
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
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
