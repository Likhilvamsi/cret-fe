"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "../dashboard/components/Sidebar";

const Modal = ({ open, onClose, children }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-lg animate-fadeIn">
        {children}

        {/* Close Button */}
        <button
          onClick={onClose}
          className="mt-6 w-full bg-red-500 text-white py-3 rounded-xl font-semibold hover:bg-red-600 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

<style>
{`
  .animate-fadeIn {
    animation: fadeIn 0.3s ease-out;
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: scale(0.9); }
    to { opacity: 1; transform: scale(1); }
  }
`}
</style>

const AddBranchAdmin = () => {
  const [branchesData, setBranchesData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    branch_id: "",
    email: "",
    password: "",
    phone: "",
  });

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const userId = localStorage.getItem("user_id");
        if (!userId) return;

        const res = await fetch(
          `http://127.0.0.1:8000/college-admin/branches?college_admin_id=${userId}`
        );
        const data = await res.json();
        setBranchesData(data);
      } catch (err) {
        setError("Something went wrong while loading branches.");
      } finally {
        setLoading(false);
      }
    };

    fetchBranches();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.branch_id || !form.email || !form.password || !form.phone) {
      setError("Please fill all fields.");
      return;
    }

    try {
      const userId = localStorage.getItem("user_id");
      setSubmitting(true);

      const res = await fetch(
        `http://127.0.0.1:8000/college-admin/branch-admins?college_admin_id=${userId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      if (!res.ok) throw new Error("Failed to create branch admin");

      setSuccess("Branch admin created successfully!");
      setForm({ branch_id: "", email: "", password: "", phone: "" });
      setModalOpen(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="text-white p-10">Loading...</div>;

  return (
    <div className="flex min-h-screen bg-page-bg p-6">
      <div className="flex flex-1 bg-sidebar-bg rounded-3xl shadow-xl overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 p-8 border-border">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-main-bg px-14 py-10 space-y-10">

          {/* Header + Add Button */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-heading">Add Branch Admin</h1>

              <p className="text-text-secondary text-sm mt-2">
                College:{" "}
                <span className="font-semibold text-text-primary">
                  {branchesData.college_name}
                </span>{" "}
                • Total Branches:{" "}
                <span className="font-semibold text-text-primary">
                  {branchesData.total_branches}
                </span>
              </p>
            </div>

            {/* NEW BUTTON */}
            <button
              onClick={() => setModalOpen(true)}
              className="bg-gradient-to-r from-blue-600 to-sky-500 text-white px-6 py-3 rounded-2xl shadow-lg hover:opacity-90 transition font-semibold"
            >
              + Add Branch Admin
            </button>
          </div>

          {/* Branch Cards */}
          <div className="space-y-4">
            <h2 className="text-xl font-heading">Branches</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {branchesData.branches.map((branch) => (
                <div
                  key={branch.branch_id}
                  className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition border border-gray-100 p-6"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {branch.branch_name}
                    </h3>

                    <span
                      className={`px-3 py-1 text-xs rounded-full text-white ${
                        branch.is_active ? "bg-green-600" : "bg-red-600"
                      }`}
                    >
                      {branch.is_active ? "Active" : "Inactive"}
                    </span>
                  </div>

                  <div className="flex items-start gap-4 mt-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl flex items-center justify-center text-white text-xl">
                      🎓
                    </div>

                    <div className="text-sm text-text-secondary space-y-1">
                      <p>
                        HOD:{" "}
                        <span className="font-semibold text-text-primary">
                          {branch.hod_name}
                        </span>
                      </p>
                      <p className="capitalize">
                        Type:{" "}
                        <span className="font-semibold text-text-primary">
                          {branch.branch_type}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Popup Modal */}
          <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
            <h2 className="text-2xl font-heading mb-4 text-center">
              Create Branch Admin
            </h2>

            {error && (
              <p className="bg-red-100 text-red-700 p-2 rounded mb-3 text-sm">
                {error}
              </p>
            )}
            {success && (
              <p className="bg-green-100 text-green-700 p-2 rounded mb-3 text-sm">
                {success}
              </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Branch dropdown */}
              <div>
                <label className="block text-sm mb-1 text-gray-600">
                  Select Branch
                </label>
                <select
                  value={form.branch_id}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, branch_id: e.target.value }))
                  }
                  className="p-3 border border-gray-300 rounded-xl w-full bg-page-bg"
                >
                  <option value="">-- Select Branch --</option>
                  {branchesData.branches.map((branch) => (
                    <option key={branch.branch_id} value={branch.branch_id}>
                      {branch.branch_name}
                    </option>
                  ))}
                </select>
              </div>

              <input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, email: e.target.value }))
                }
                className="p-3 border border-gray-300 rounded-xl w-full bg-page-bg"
              />

              <input
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, password: e.target.value }))
                }
                className="p-3 border border-gray-300 rounded-xl w-full bg-page-bg"
              />

              <input
                type="text"
                placeholder="Phone Number"
                value={form.phone}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, phone: e.target.value }))
                }
                className="p-3 border border-gray-300 rounded-xl w-full bg-page-bg"
              />

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-accent-green text-black py-3 rounded-xl font-semibold"
              >
                {submitting ? "Creating..." : "Create Branch Admin"}
              </button>
            </form>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default AddBranchAdmin;
