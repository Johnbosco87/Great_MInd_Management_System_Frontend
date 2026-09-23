import { useEffect, useState } from "react";

import {
  getAttendance,
  createAttendance,
  getStudents,
  getCourses,
} from "../api.js";

import Resource from "../components/Resource.jsx";

function Attendance() {
  const [items, setItems] = useState([]);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);

  const [form, setForm] = useState({
    students: "",
    courses: "",
    date: new Date().toISOString().slice(0, 10),
    status: "present",
  });

  const load = () => {
    getAttendance().then((r) => setItems(r.data));
    getStudents().then((r) => setStudents(r.data));
    getCourses().then((r) => setCourses(r.data));
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async (e) => {
  e.preventDefault();

  try {
    console.log("ATTENDANCE BEING SENT:", form);

    const response = await createAttendance(form);

    console.log("ATTENDANCE SAVED:", response.data);

    alert("Attendance recorded successfully!");

    load();

  } catch (error) {
    console.error("ERROR SAVING ATTENDANCE:", error);
    console.error("SERVER RESPONSE:", error.response?.data);

    alert("Failed to record attendance.");
  }
};

  return (
    <Resource title="Attendance">

      <form onSubmit={submit} className="form-grid">

        <select
          value={form.students}
          onChange={(e) =>
            setForm({
              ...form,
              students: e.target.value,
            })
          }
          required
        >
          <option value="">Student</option>

          {students.map((s) => (
            <option key={s.id} value={s.id}>
              {s.first_name} {s.last_name}
            </option>
          ))}
        </select>

        <select
          value={form.courses}
          onChange={(e) =>
            setForm({
              ...form,
              courses: e.target.value,
            })
          }
          required
        >
          <option value="">Course</option>

          {courses.map((c) => (
            <option key={c.id} value={c.id}>
              {c.code} - {c.name}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={form.date}
          onChange={(e) =>
            setForm({
              ...form,
              date: e.target.value,
            })
          }
          required
        />

        <select
          value={form.status}
          onChange={(e) =>
            setForm({
              ...form,
              status: e.target.value,
            })
          }
        >
          <option value="present">Present</option>
          <option value="absent">Absent</option>
          <option value="late">Late</option>
        </select>

        <button>Record Attendance</button>

      </form>

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Student</th>
            <th>Course</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {items.map((a) => (
            <tr key={a.id}>
              <td>{a.date}</td>
              <td>{a.student_name}</td>
              <td>{a.course_name}</td>
              <td>{a.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </Resource>
  );
}

export default Attendance;