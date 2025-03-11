import React, { useEffect, useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { handleSuccess } from "../../Utils";
import { ToastContainer } from "react-toastify";

function Dashboard() {
  const [loggedInUser, setLoggedInUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess("User Logged out");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  // Sidebar items now include a path that matches our nested routes
  const sidebarItems = [
    { name: "Employee Management", path: "employee" },
    { name: "Project Management", path: "project" },
    { name: "Lead and CRM Management", path: "lead" },
    { name: "Time Sheet Management", path: "timesheet" },
  ];

  return (
    <div style={{ display: "flex", height: "100vh", width: "100vw" }}>
      {/* Sidebar */}
      <div
        style={{
          width: "250px",
          background: "#2C3E50",
          color: "#fff",
          padding: "20px",
        }}
      >
        <h2>Dashboard</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {sidebarItems.map((item, index) => (
            <li key={index} style={{ margin: "10px 0" }}>
              <NavLink
                to={item.path}
                style={({ isActive }) => ({
                  color: "#fff",
                  textDecoration: "none",
                  background: isActive ? "#34495E" : "transparent",
                  padding: "10px",
                  display: "block",
                })}
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
        <button
          onClick={handleLogout}
          style={{
            marginTop: "20px",
            background: "#E74C3C",
            color: "#fff",
            border: "none",
            padding: "10px",
            cursor: "pointer",
            width: "100%",
          }}
        >
          Logout
        </button>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, padding: "20px", overflowY: "auto" }}>
        <h1>Welcome, {loggedInUser}</h1>
        {/* The Outlet renders the child routes defined in App.js */}
        <Outlet />
      </div>

      <ToastContainer />
    </div>
  );
}

export default Dashboard;
