import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../../Utils.jsx";

function Login() {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;

    if (!email || !password) {
      return handleError("Email and password are required");
    }

    try {
      const url = `https://mern-project-badc.onrender.com/api/auth/login`; // Fixed URL typo
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginInfo),
      });

      const result = await response.json();
      const { success, message, jwtToken, name, error } = result;

      if (success) {
        handleSuccess(message);
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("loggedInUser", name);
        setTimeout(() => navigate("/dashboard"), 1000);
      } else {
        handleError(error?.details?.[0]?.message || message || "Login failed");
      }
    } catch (err) {
      handleError("Server error. Please try again later.");
    }
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        backgroundImage:
          "url('https://miro.medium.com/v2/resize:fit:1400/1*QtX9tWcVWv1YFYr_rFEjbA.gif')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%",
      }}
    >
      <div
        className="card shadow-lg p-4"
        style={{a
          width: "100%",
          maxWidth: "400px",
          backgroundColor: "#d0dbe9",
          margin: "auto", // Better centering
        }}
      >
        <div className="card-body">
          <h1 className="card-title text-center mb-4">Login</h1>

          <form onSubmit={handleLogin} className="needs-validation" noValidate>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                className="form-control"
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={loginInfo.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                className="form-control"
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={loginInfo.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="d-grid mb-3">
              <button type="submit" className="btn btn-primary btn-lg">
                Sign In
              </button>
            </div>

            <div className="text-center">
              <span className="text-muted">
                Don't have an account?{" "}
                <Link to="/signup" className="text-decoration-none">
                  Sign Up
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
