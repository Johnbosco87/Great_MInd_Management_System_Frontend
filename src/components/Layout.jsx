import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Layout({ children }) {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    navigate("/login");
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>

      <aside>
      <div className="header">
        <div className="logo">
          <h2>Great Mind</h2>

          <button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>

        <nav>
          <Link to="/">Dashboard</Link>
          <Link to="/students">Students</Link>
          <Link to="/teachers">Teachers</Link>
          <Link to="/courses">Courses</Link>
          <Link to="/attendance">Attendance</Link>
          <Link to="/records">Academic Records</Link>
        </nav>
      </div>

        {/* Logout */}
        <button onClick={handleLogout}>
          Logout
        </button>

      </aside>

      <main>{children}</main>

    </div>
  );
}

export default Layout;