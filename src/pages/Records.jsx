import { useEffect, useState } from "react";

import {
  getRecords,
  createRecord,
  getStudents,
  getCourses,
} from "../api";

import Resource from "../components/Resource.jsx";

function Records() {
  const [items, setItems] = useState([]);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);

  const [form, setForm] = useState({
    students: "",
    courses: "",
    session: "2026/2027",
    term: "First",
    ca_score: 0,
    exam_score: 0,
  });

  const load = async () => {
  try {
    const recordsResponse = await getRecords();
    const studentsResponse = await getStudents();
    const coursesResponse = await getCourses();

    console.log("RECORDS FROM DJANGO:", recordsResponse.data);
    console.log("STUDENTS FROM DJANGO:", studentsResponse.data);
    console.log("COURSES FROM DJANGO:", coursesResponse.data);

    setItems(recordsResponse.data);
    setStudents(studentsResponse.data);
    setCourses(coursesResponse.data);
  } catch (error) {
    console.error("Error loading data:", error);
    console.error("Server response:", error.response?.data);
  }
};

  useEffect(() => {
    load();
  }, []);

const submit = async (e) => {
  e.preventDefault();

  try {
    const data = {
      ...form,
      ca_score: Number(form.ca_score),
      exam_score: Number(form.exam_score),
    };

    console.log("SENDING RECORD:", data);

    await createRecord(data);

    alert("Record saved successfully!");

    const response = await getRecords();

    console.log("RECORDS AFTER SAVING:", response.data);

    setItems(response.data);

  } catch (error) {
    console.error("Error saving record:", error);
    console.error("Server response:", error.response?.data);

    alert("Failed to save record.");
  }
};

  return (
    <Resource title="Academic Records">

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
          placeholder="Session"
          value={form.session}
          onChange={(e) =>
            setForm({
              ...form,
              session: e.target.value,
            })
          }
        />

        <input
          placeholder="Term"
          value={form.term}
          onChange={(e) =>
            setForm({
              ...form,
              term: e.target.value,
            })
          }
        />

        <input
          type="number"
          min="0"
          max="40"
          placeholder="CA / 40"
          value={form.ca_score}
          onChange={(e) =>
            setForm({
              ...form,
              ca_score: e.target.value,
            })
          }
        />

        <input
          type="number"
          min="0"
          max="60"
          placeholder="Exam / 60"
          value={form.exam_score}
          onChange={(e) =>
            setForm({
              ...form,
              exam_score: e.target.value,
            })
          }
        />

        <button>Save Record</button>

      </form>

      <table>
        <thead>
          <tr>
            <th>Student</th>
            <th>Course</th>
            <th>Session</th>
            <th>Term</th>
            <th>Total</th>
            <th>Grade</th>
          </tr>
        </thead>

        <tbody>
          {items.map((r) => (
            <tr key={r.id}>
              <td>{r.student_name}</td>
              <td>{r.course_name}</td>
              <td>{r.session}</td>
              <td>{r.term}</td>
              <td>{r.total_score}</td>
              <td>
                <strong>{r.grade}</strong>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </Resource>
  );
}

export default Records;