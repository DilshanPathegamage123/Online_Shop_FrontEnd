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

          {/*for customer */}
          <Route element={<ProtectedRoute requiredRole="customer" />}>
            <Route
              path="/home"
              element={
                <>
                  <Home />
                </>
              }
            />
          </Route>

          {/*for admin only */}
          <Route element={<ProtectedRoute requiredRole="admin" />}>
            <Route
              path="/admin"
              element={
                <>
                  <Admin_Page />
                </>
              }
            />
          </Route>

          <Route path="*" element={<Navigate to="/signin" replace />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
