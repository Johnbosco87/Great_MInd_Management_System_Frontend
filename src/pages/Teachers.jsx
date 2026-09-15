import { useEffect, useState } from "react";

import {
  getTeachers,
  createTeacher,
} from "../api";

import Resource from "../components/Resource.jsx";

function Teachers() {
  const [items, setItems] = useState([]);

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    employee_number: "",
    email: "",
    phone: "",
    subject: "",
  });

  const load = () => {
    getTeachers().then((r) => setItems(r.data));
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async (e) => {
    e.preventDefault();

    await createTeacher(form);

    setForm({
      first_name: "",
      last_name: "",
      employee_number: "",
      email: "",
      phone: "",
      subject: "",
    });

    load();
  };

  return (
    <Resource title="Teachers">

      <form onSubmit={submit} className="form-grid">

        {[
          "first_name",
          "last_name",
          "employee_number",
          "email",
          "phone",
          "subject",
        ].map((key) => (
          <input
            key={key}
            placeholder={key.replaceAll("_", " ")}
            value={form[key]}
            onChange={(e) =>
              setForm({
                ...form,
                [key]: e.target.value,
              })
            }
            required={[
              "first_name",
              "last_name",
              "employee_number",
            ].includes(key)}
          />
        ))}

        <button>Add Teacher</button>

      </form>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Employee No.</th>
            <th>Email</th>
            <th>Subject</th>
          </tr>
        </thead>

        <tbody>
          {items.map((t) => (
            <tr key={t.id}>
              <td>
                {t.first_name} {t.last_name}
              </td>

              <td>{t.employee_number}</td>

              <td>{t.email}</td>

              <td>{t.subject}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </Resource>
  );
}

export default Teachers;