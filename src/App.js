
import React, { useState } from "react";


function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    name: "",
    roll: "",
    studentClass: ""
  });
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");

  // Add or Update Student
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.roll.trim() || !form.studentClass.trim()) {
      setMessage("Please fill in all fields!");
      return;
    }

    const duplicate = students.some(
      (s) =>
        s.roll.toLowerCase() === form.roll.trim().toLowerCase() &&
        s.id !== editId
    );

    if (duplicate) {
      setMessage("Roll number already exists!");
      return;
    }

    if (editId !== null) {
      setStudents(
        students.map((s) =>
          s.id === editId ? {
            ...s, ...form,
            name: form.name.trim(),
            roll: form.roll.trim(),
            studentClass: form.studentClass.trim()
          } : s
        )
      );
      setMessage("Student updated successfully!");
    } else {
      setStudents([
        ...students,
        {
          id: Date.now(),
          name: form.name.trim(),
          roll: form.roll.trim(),
          studentClass: form.studentClass.trim()
        }
      ]);
      setMessage("Student added successfully!");
    }

    setForm({ name: "", roll: "", studentClass: "" });
    setEditId(null);
  };

  // Edit Student
  const handleEdit = (student) => {
    setForm({
      name: student.name,
      roll: student.roll,
      studentClass: student.studentClass
    });
    setEditId(student.id);
    setMessage("");
  };

  // Delete Student
  const handleDelete = (id) => {
    setStudents(students.filter((s) => s.id !== id));

    if (editId === id) {
      setEditId(null);
      setForm({ name: "", roll: "", studentClass: "" });
    }

    setMessage("Student deleted successfully!");
  };

  // Search Student
  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-light min-vh-100 py-4">
      <div className="container">

        <div className="bg-primary text-white text-center rounded p-4 mb-4 shadow">
          <h2>Student Management</h2>
          <p className="mb-0">Manage your student records easily</p>
        </div>

        <div className="row g-4">

          {/* Student Form */}
          <div className="col-md-4">
            <div className="card shadow-sm border-0">
              <div className="card-header bg-dark text-white">
                {editId !== null ? "Edit Student" : "Add New Student"}
              </div>

              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <input
                    className="form-control mb-3"
                    placeholder="Student Name"
                    value={form.name}
                    onChange={(e) =>
                      setForm({ ...form, name: e.target.value })
                    }
                  />

                  <input
                    className="form-control mb-3"
                    placeholder="Roll Number"
                    value={form.roll}
                    onChange={(e) =>
                      setForm({ ...form, roll: e.target.value })
                    }
                  />

                  <input
                    className="form-control mb-3"
                    placeholder="Class (Example: 10A)"
                    value={form.studentClass}
                    onChange={(e) =>
                      setForm({ ...form, studentClass: e.target.value })
                    }
                  />

                  <button className="btn btn-primary w-100" type="submit">
                    {editId !== null ? "Update Student" : "Add Student"}
                  </button>

                  {editId !== null && (
                    <button
                      type="button"
                      className="btn btn-secondary w-100 mt-2"
                      onClick={() => {
                        setEditId(null);
                        setForm({ name: "", roll: "", studentClass: "" });
                        setMessage("");
                      }}
                    >
                      Cancel
                    </button>
                  )}
                </form>

                {message && (
                  <div className="alert alert-info mt-3 mb-0">
                    {message}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Student Table */}
          <div className="col-md-8">
            <div className="card shadow-sm border-0">
              <div className="card-body">

                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="mb-0">Student List</h5>
                  <span className="badge bg-primary">
                    Total: {students.length}
                  </span>
                </div>

                <input
                  className="form-control mb-3"
                  placeholder="Search student by name..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />

                <div className="table-responsive">
                  <table className="table table-hover table-bordered align-middle">
                    <thead className="table-dark">
                      <tr>
                        <th>Name</th>
                        <th>Roll No.</th>
                        <th>Class</th>
                        <th>Actions</th>
                      </tr>
                    </thead>

                    <tbody>
                      {filteredStudents.length === 0 ? (
                        <tr>
                          <td colSpan="4" className="text-center text-muted">
                            No students found
                          </td>
                        </tr>
                      ) : (
                        filteredStudents.map((s) => (
                          <tr key={s.id}>
                            <td>{s.name}</td>
                            <td>{s.roll}</td>
                            <td>{s.studentClass}</td>
                            <td>
                              <button
                                className="btn btn-warning btn-sm me-2 mb-1"
                                onClick={() => handleEdit(s)}
                              >
                                Edit
                              </button>

                              <button
                                className="btn btn-danger btn-sm mb-1"
                                onClick={() => handleDelete(s.id)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;

