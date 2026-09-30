import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { getDashboard, getAttendance } from "../api";
import Card from "../components/Card.jsx";

function Dashboard() {
  const [data, setData] = useState({});
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    // Get dashboard information
    getDashboard()
      .then((r) => {
        setData(r.data);
      })
      .catch((error) => {
        console.error("Error loading dashboard:", error);
      });

    // Get attendance information
    getAttendance()
      .then((r) => {
        const attendance = r.data;

        console.log("Attendance data from Django:", attendance);

        const students = {};

        attendance.forEach((record) => {
          const studentName = record.student_name;

          if (!studentName) {
            return;
          }

          if (!students[studentName]) {
            students[studentName] = {
              student: studentName,
              present: 0,
              absent: 0,
              late: 0,
            };
          }

          // Django uses lowercase status values
          if (record.status === "present") {
            students[studentName].present += 1;
          }

          if (record.status === "absent") {
            students[studentName].absent += 1;
          }

          if (record.status === "late") {
            students[studentName].late += 1;
          }
        });

        const chartData = Object.values(students);

        console.log("Chart data:", chartData);

        setAttendanceData(chartData);
      })
      .catch((error) => {
        console.error("Error loading attendance:", error);
      });
  }, []);

  return (
    <>
      <h1>Dashboard</h1>

      {/* Dashboard Cards */}
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

      {/* Attendance Graph */}
      <div
        style={{
          width: "100%",
          height: "400px",
          marginTop: "40px",
        }}
      >
        <h2>Student Attendance</h2>

        <ResponsiveContainer width="100%" height="90%">
          <BarChart data={attendanceData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="student" />

            <YAxis />

            <Tooltip />

            <Legend />

            <Bar
              dataKey="present"
              name="Present"
              fill="#22c55e"
            />

            <Bar
              dataKey="absent"
              name="Absent"
              fill="#ef4444"
            />

            <Bar
              dataKey="late"
              name="Late"
              fill="#f59e0b"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}

export default Dashboard;
