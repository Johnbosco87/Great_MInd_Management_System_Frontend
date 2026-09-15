import { useEffect, useState } from "react";

import {
  getCourses,
  createCourse,
  getTeachers,
} from "../api";

import Resource from "../components/Resource.jsx";

function Courses() {
  const [items, setItems] = useState([]);
  const [teachers, setTeacher] = useState([]);

  const [form, setForm] = useState({
    name: "",
    code: "",
    teacher: "",
    class_name: "",
    description: "",
  });

  const load = () => {
    getCourses().then((r) => setItems(r.data));
    getTeachers().then((r) => setTeacher(r.data));
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async (e) => {
    e.preventDefault();

    await createCourse({
      ...form,
      teacher: form.teacher || null,
    });

    setForm({
      name: "",
      code: "",
      teacher: "",
      class_name: "",
      description: "",
    });

    load();
  };

  return (
    <Resource title="Courses">

      <form onSubmit={submit} className="form-grid">

        <input
          placeholder="Course name"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
          required
        />

        <input
          placeholder="Course code"
          value={form.code}
          onChange={(e) =>
            setForm({
              ...form,
              code: e.target.value,
            })
          }
          required
        />

        <select
          value={form.teacher}
          onChange={(e) =>
            setForm({
              ...form,
              teacher: e.target.value,
            })
          }
        >
          <option value="">Teacher</option>

          {teachers.map((t) => (
            <option key={t.id} value={t.id}>
              {t.first_name} {t.last_name}
            </option>
          ))}
        </select>

        <input
          placeholder="Class"
          value={form.class_name}
          onChange={(e) =>
            setForm({
              ...form,
              class_name: e.target.value,
            })
          }
          required
        />

        <input
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({
              ...form,
              description: e.target.value,
            })
          }
        />

        <button>Add Course</button>

      </form>

      <table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Class</th>
            <th>Teacher</th>
          </tr>
        </thead>

        <tbody>
          {items.map((c) => (
            <tr key={c.id}>
              <td>{c.code}</td>
              <td>{c.name}</td>
              <td>{c.class_name}</td>
              <td>{c.teacher_name || "Unassigned"}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </Resource>
  );
}

export default Courses;