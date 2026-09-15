import { useEffect, useState } from "react";
import { getDashboard } from "../api";
import Card from "../components/Card.jsx";

function Dashboard() {
  const [data, setData] = useState({});

  useEffect(() => {
    getDashboard().then((r) => setData(r.data));
  }, []);

  return (
    <>
      <h1>Dashboard</h1>

      <div className="cards">
        <Card
          title="Students"
          value={data.students ?? 0}
        />

        <Card
          title="Teachers"
          value={data.teachers ?? 0}
        />

        <Card
          title="Courses"
          value={data.courses ?? 0}
        />

        <Card
          title="Attendance Records"
          value={data.attendance_records ?? 0}
        />

        <Card
          title="Academic Records"
          value={data.academic_records ?? 0}
        />
      </div>
    </>
  );
}

export default Dashboard;