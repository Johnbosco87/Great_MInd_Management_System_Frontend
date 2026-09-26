import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import ForgotPassword from "./pages/ForgotPassword";
import Register from "./pages/Register";

import Layout from "./components/Layout.jsx";

import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Teachers from "./pages/Teachers";
import Courses from "./pages/Courses";
import Attendance from "./pages/Attendance";
import Records from "./pages/Records";

function App() {
  return (
    <Layout>
      <Routes>
       <Route path="/login" element={<Login />} />
        <Route 
        path="/" 
        element={
          <ProtectedRoute>
             <Dashboard />
          </ProtectedRoute>
        }
        />

        <Route
          path="/students"
          element={
            <ProtectedRoute>
                 <Students />
            </ProtectedRoute>
          }
        />

        <Route
          path="/teachers"
          element={
          <ProtectedRoute>
             <Teachers />
          </ProtectedRoute>
          }
        />

        <Route
          path="/courses"
          element={
          <ProtectedRoute>
            <Courses />
          </ProtectedRoute>
          }
        />

        <Route
          path="/attendance"
          element={
          <ProtectedRoute>
            <Attendance />
          </ProtectedRoute>
          }
        />

        <Route
          path="/records"
          element={
          <ProtectedRoute>
             <Records />
          </ProtectedRoute>}
        />

        <Route
          path="/reset-password/:uid/:token/"
          element={<ResetPassword />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/register"
         element={<Register />}
        />
      </Routes>
    </Layout>
  );
}

export default App;