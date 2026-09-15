import { useEffect, useState } from "react";

import {
  getStudents,
  createStudent,
  deleteStudent,
} from "../api";

import Resource from "../components/Resource.jsx";

function Students() {
  const [items, setItems] = useState([]);

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    admission_number: "",
    class_name: "",
    gender: "",
    guardian_name: "",
    guardian_phone: "",
  });

  const load = () => {
    getStudents().then((r) => setItems(r.data));
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async (e) => {
    e.preventDefault();

    await createStudent(form);

    setForm({
      first_name: "",
      last_name: "",
      admission_number: "",
      class_name: "",
      gender: "",
      guardian_name: "",
      guardian_phone: "",
    });

    load();
  };

  const remove = async (id) => {
    await deleteStudent(id);
    load();
  };

  return (
    <Resource title="Students">

      <form onSubmit={submit} className="form-grid">

        <input
          placeholder="First name"
          value={form.first_name}
          onChange={(e) =>
            setForm({
              ...form,
              first_name: e.target.value,
            })
          }
          required
        />

        <input
          placeholder="Last name"
          value={form.last_name}
          onChange={(e) =>
            setForm({
              ...form,
              last_name: e.target.value,
            })
          }
          required
        />

        <input
          placeholder="Admission number"
          value={form.admission_number}
          onChange={(e) =>
            setForm({
              ...form,
              admission_number: e.target.value,
            })
          }
          required
        />

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

        <select
          value={form.gender}
          onChange={(e) =>
            setForm({
              ...form,
              gender: e.target.value,
            })
          }
        >
          <option value="">Gender</option>
          <option value="M">Male</option>
          <option value="F">Female</option>
        </select>

        <input
          placeholder="Guardian name"
          value={form.guardian_name}
          onChange={(e) =>
            setForm({
              ...form,
              guardian_name: e.target.value,
            })
          }
        />

        <input
          placeholder="Guardian phone"
          value={form.guardian_phone}
          onChange={(e) =>
            setForm({
              ...form,
              guardian_phone: e.target.value,
            })
          }
        />

        <button>Add Student</button>

      </form>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Admission No.</th>
            <th>Class</th>
            <th>Guardian</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {items.map((s) => (
            <tr key={s.id}>
              <td>
                {s.first_name} {s.last_name}
              </td>

              <td>{s.admission_number}</td>

              <td>{s.class_name}</td>

              <td>{s.guardian_name}</td>

              <td>
                <button
                  className="danger"
                  onClick={() => remove(s.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </Resource>
  );
}

export default Students;