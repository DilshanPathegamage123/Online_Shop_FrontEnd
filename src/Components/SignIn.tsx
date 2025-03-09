import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store";
import api from "../api";

interface ApiErrorData {
  message?: string;
  [key: string]: unknown;
}

interface ApiErrorResponse {
  status: number;
  data?: ApiErrorData;
}

interface ApiError {
  response?: ApiErrorResponse;
  request?: unknown;
  message?: string;
}

const SignIn = () => {
  const [password, setPassword] = useState("");
  const [user_name, setUserName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Use your configured api instance instead of raw axios
      const apiResponse = await api.post("/auth/login", {
        user_name,
        password,
      });

      // Extract response data
      const { token, user } = apiResponse.data;
      const userRole = user.role;
      // Dispatch login action to update Redux state
      dispatch(
        login({
          token,
          userRole,
        })
      );

      // Navigate based on the user role
      if (userRole === "admin") {
        navigate("/admin");
      } else {
        navigate("/home");
      }
    } catch (err: unknown) {
      if (err && typeof err === "object" && "response" in err) {
        const axiosError = err as ApiError;

        if (axiosError.response) {
          if (axiosError.response.status === 401) {
            setError("Invalid username or password");
          } else if (
            axiosError.response.data &&
            typeof axiosError.response.data === "object" &&
            "message" in axiosError.response.data
          ) {
            setError(axiosError.response.data.message as string);
          } else {
            setError(`Error: ${axiosError.response.status}`);
          }
        } else if ("request" in err) {
          setError("No response from server. Please try again later.");
        }
      } else {
        setError("An error occurred during login");
      }
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center col-4 vh-100">
      <div className="container bg-dark text-white p-5 rounded shadow">
        <div className="fs-1 mb-3 text-center">SignIn to your Account</div>
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fs-5">User Name</label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={user_name}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label fs-5">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="d-grid">
            <button
              type="submit"
              className="btn btn-primary py-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Logging in...
                </>
              ) : (
                "Log In"
              )}
            </button>
          </div>
        </form>
        <div className="text-center mt-4">
          <div className="mb-2">
            If you don't have an account, Click here to register...
          </div>
          <Link to="/signup" className="btn btn-secondary py-2 px-4">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
