import { Link } from "react-router-dom";

function Layout({ children }) {
  return (
    <div className="app">
      <aside>
        <h2>Great Mind</h2>

        <nav>
          <Link to="/">Dashboard</Link>
          <Link to="/students">Students</Link>
          <Link to="/teachers">Teachers</Link>
          <Link to="/courses">Courses</Link>
          <Link to="/attendance">Attendance</Link>
          <Link to="/records">Academic Records</Link>
        </nav>
      </aside>

      <main>{children}</main>
    </div>
  );
}

export default Layout;