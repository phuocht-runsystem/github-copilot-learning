import React, { useState } from "react";

const FAKE_EMPLOYEES = Array.from({ length: 42 }, (_, i) => ({
  id: i + 1,
  name: `Employee ${i + 1}`,
  email: `employee${i + 1}@company.com`,
  position: ["Developer", "Designer", "Manager", "QA"][i % 4],
}));

const PAGE_SIZE = 10;

/**
 * EmployeesPage component displays a paginated table of employees.
 *
 * It renders a styled table showing employee ID, name, email, and position,
 * with pagination controls to navigate between pages of employees.
 *
 * The employee data is sourced from the FAKE_EMPLOYEES array, and the page size
 * is determined by the PAGE_SIZE constant. The component manages the current page
 * state and updates the displayed employees accordingly.
 *
 * @returns {JSX.Element} The rendered EmployeesPage component.
 */
export default function EmployeesPage() {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(FAKE_EMPLOYEES.length / PAGE_SIZE);

  const employees = FAKE_EMPLOYEES.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", background: "#f6f8fa", padding: 24, borderRadius: 12, boxShadow: "0 2px 16px rgba(0,0,0,0.08)" }}>
      <h1 style={{ textAlign: "center", marginBottom: 24, color: "#007bff" }}>Employees</h1>
      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 16, border: "1px solid #e0e0e0", borderRadius: 8, overflow: "hidden" }}>
        <thead>
          <tr style={{ background: "#007bff", color: "#fff" }}>
            <th style={{ borderBottom: "1px solid #ccc", padding: 10, fontWeight: 600, color: "#222" }}>ID</th>
            <th style={{ borderBottom: "1px solid #ccc", padding: 10, fontWeight: 600, color: "#222" }}>Name</th>
            <th style={{ borderBottom: "1px solid #ccc", padding: 10, fontWeight: 600, color: "#222" }}>Email</th>
            <th style={{ borderBottom: "1px solid #ccc", padding: 10, fontWeight: 600, color: "#222" }}>Position</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp, idx) => (
            <tr key={emp.id} style={{ background: idx % 2 === 0 ? "#fff" : "#f0f4fa" }}>
              <td style={{ padding: 10, color: "#222" }}>{emp.id}</td>
              <td style={{ padding: 10, color: "#222" }}>{emp.name}</td>
              <td style={{ padding: 10, color: "#222" }}>{emp.email}</td>
              <td style={{ padding: 10, color: "#222" }}>{emp.position}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          style={{ padding: "8px 16px", borderRadius: 6, border: "1px solid #ccc", background: page === 1 ? "#eee" : "#007bff", color: page === 1 ? "#888" : "#fff", cursor: page === 1 ? "not-allowed" : "pointer" }}
        >
          Prev
        </button>
        <span style={{ alignSelf: "center", fontWeight: 500 }}>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          style={{ padding: "8px 16px", borderRadius: 6, border: "1px solid #ccc", background: page === totalPages ? "#eee" : "#007bff", color: page === totalPages ? "#888" : "#fff", cursor: page === totalPages ? "not-allowed" : "pointer" }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
