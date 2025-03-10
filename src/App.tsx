import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Admin_Page from "./Pages/Admin_Page";
import Home from "./Pages/Home";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import ProtectedRoute from "./Routes/ProtectedRoute";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Home page - accessible to both customer and admin */}
          <Route
            element={<ProtectedRoute requiredRoles={["customer", "admin"]} />}
          >
            <Route path="/home" element={<Home />} />
          </Route>

          {/* Admin page - admin only */}
          <Route element={<ProtectedRoute requiredRoles="admin" />}>
            <Route path="/admin" element={<Admin_Page />} />
          </Route>

          {/* Default route */}
          <Route path="/" element={<Navigate to="/signin" replace />} />

          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/signin" replace />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;