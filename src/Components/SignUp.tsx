import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
    status?: number;
  };
  message?: string;
}

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    user_name: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (formData.password !== formData.confirm_password) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const registrationData = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        user_name: formData.user_name,
        email: formData.email,
        password: formData.password,
        role: "customer",
      };

      await api.post("/auth/register", registrationData);

      navigate("/signin");
    } catch (err: unknown) {
      const apiError = err as ApiError;

      if (apiError.response?.data?.message) {
        setError(apiError.response.data.message);
      } else {
        setError("Registration failed. Please try again.");
      }
      console.error("Registration error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div
        className="container bg-dark text-white p-5 rounded shadow"
        style={{ maxWidth: "800px" }}
      >
        <div className="fs-1 mb-4 text-center">Register Here</div>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="row">
            {/* Left Column */}
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="first_name" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="user_name" className="form-label">
                  User Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="user_name"
                  value={formData.user_name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="last_name" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="confirm_password"
                  value={formData.confirm_password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* Full-width button row */}
          <div className="row mt-4">
            <div className="col-12 text-center">
              <button
                type="submit"
                className="btn btn-primary py-2 px-5"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Registering...
                  </>
                ) : (
                  "Register"
                )}
              </button>
            </div>
          </div>
        </form>

        <div className="text-center mt-4">
          <div className="mb-2">
            If you already have an account, Click here to login...
          </div>
          <Link to="/signin" className="btn btn-secondary py-2 px-4">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
