import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../../Utils";

function Register() {
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;
    if (!name || !email || !password) {
      return handleError("Name, email and password are required");
    }
    try {
      const url = `https://mern-project-badc.onrender.com/api/auth/signup`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupInfo),
      });
      const result = await response.json();
      const { success, message, error } = result;

      if (success) {
        handleSuccess(message);
        setTimeout(() => navigate("/login"), 1000);
      } else {
        handleError(error?.details[0]?.message || message);
      }
    } catch (err) {
      handleError(err.message);
    }
  };

  return (
    <div
      className="container min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        backgroundImage:
          "url('https://miro.medium.com/v2/resize:fit:1400/1*QtX9tWcVWv1YFYr_rFEjbA.gif')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "center",
        backgroundPosition: "center",
        width: "100%",
        position: "relative",
      }}
    >
      <div
        className="card shadow-lg p-4"
        style={{
          width: "100%",
          maxWidth: "400px",
          backgroundColor: "#d0dbe9",
          position: "absolute",
          left: "50px",
        }}
        // >
      >
        <div className="card-body">
          <h1 className="card-title text-center mb-4">Create Account</h1>

          <form onSubmit={handleSignup} className="needs-validation" noValidate>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Full Name
              </label>
              <input
                className="form-control"
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                value={signupInfo.name}
                onChange={handleChange}
                autoFocus
                required
              />
              <div className="invalid-feedback">Please enter your name</div>
            </div>

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
                value={signupInfo.email}
                onChange={handleChange}
                required
              />
              <div className="invalid-feedback">Please enter a valid email</div>
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
                value={signupInfo.password}
                onChange={handleChange}
                required
              />
              <div className="invalid-feedback">Please enter your password</div>
            </div>

            <div className="d-grid mb-3">
              <button type="submit" className="btn btn-primary btn-lg">
                Create Account
              </button>
            </div>

            <div className="text-center">
              <span className="text-muted">
                Already have an account?{" "}
                <Link to="/login" className="text-decoration-none">
                  Login
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

export default Register;
