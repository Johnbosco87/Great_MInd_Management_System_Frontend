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
    student: "",
    course: "",
    session: "2026/2027",
    term: "First",
    ca_score: 0,
    exam_score: 0,
  });

  const load = () => {
    getRecords().then((r) => setItems(r.data));
    getStudents().then((r) => setStudents(r.data));
    getCourses().then((r) => setCourses(r.data));
  };

  useEffect(() => {
    load();
  }, []);

 const submit = async (e) => {
    e.preventDefault();

    try {
        await createRecord({
            ...form,
            ca_score: Number(form.ca_score),
            exam_score: Number(form.exam_score),
        });

        alert("Record saved successfully!");

        // Get the records again from Django
        const response = await getRecords();
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
          value={form.student}
          onChange={(e) =>
            setForm({
              ...form,
              student: e.target.value,
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
          value={form.course}
          onChange={(e) =>
            setForm({
              ...form,
              course: e.target.value,
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