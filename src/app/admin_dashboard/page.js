"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar"

export default function DashboardLayout() {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ---------- ADD COLLEGE MODAL STATES ----------
  const [showAddCollege, setShowAddCollege] = useState(false);
  const [collegeLoading, setCollegeLoading] = useState(false);
  const [collegeError, setCollegeError] = useState("");

  const [collegeForm, setCollegeForm] = useState({
    college_name: "",
    college_code: "",
    city: "",
    state: "",
    phone: "",
    email: "",
    website: "",
  });

  function handleCollegeChange(e) {
    setCollegeForm({
      ...collegeForm,
      [e.target.name]: e.target.value,
    });
  }

  // ---------- FETCH ALL COLLEGES ----------
  async function fetchColleges() {
    try {
      setLoading(true);

      const appAdminId =
        typeof window !== "undefined"
          ? localStorage.getItem("app_admin_id") || 1
          : 1;

      const res = await fetch(
        `http://52.247.225.119:8000/app-admin/colleges?app_admin_id=${appAdminId}`
      );

      if (!res.ok) throw new Error("Failed to load colleges");

      const json = await res.json();
      setColleges(json.colleges || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // ---------- ADD COLLEGE API CALL ----------
  async function addCollege() {
    try {
      setCollegeLoading(true);
      setCollegeError("");

      const appAdminId =
        typeof window !== "undefined"
          ? localStorage.getItem("app_admin_id") || 1
          : 1;

      const res = await fetch(
        `http://52.247.225.119:8000/app-admin/colleges?app_admin_id=${appAdminId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(collegeForm),
        }
      );

      if (!res.ok) {
        const errJson = await res.json();
        throw new Error(errJson.detail?.[0]?.msg || "Failed to create college");
      }

      setShowAddCollege(false);
      fetchColleges();
    } catch (err) {
      setCollegeError(err.message);
    } finally {
      setCollegeLoading(false);
    }
  }

  useEffect(() => {
    fetchColleges();
  }, []);

  const totalColleges = colleges.length;
  const totalBranches = colleges.reduce(
    (sum, col) => sum + col.total_branches,
    0
  );
  const totalStudents = colleges.reduce(
    (sum, col) => sum + col.total_students,
    0
  );

  return (
    <div className="flex min-h-screen bg-page-bg p-6">
      <div className="flex flex-1 bg-sidebar-bg rounded-3xl shadow-xl overflow-hidden">
        {/* SIDEBAR */}
        <div className="w-64 p-8 border-border">
          <Sidebar />
        </div>

        {/* MAIN CONTENT */}
        <div className="flex-1 bg-main-bg px-14 py-10 space-y-10">
          {/* HEADER */}
          <div>
            <h1 className="text-4xl font-heading">Dashboard</h1>
            <p className="text-text-secondary mt-1">
              Welcome Admin — Here is your system overview.
            </p>
          </div>

          {/* TOP CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-3xl shadow p-6 flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white text-2xl">
                🏫
              </div>
              <div>
                <p className="text-text-secondary text-sm">Total Colleges</p>
                <p className="text-3xl font-semibold">{totalColleges}</p>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow p-6 flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center text-white text-2xl">
                🏢
              </div>
              <div>
                <p className="text-text-secondary text-sm">Total Branches</p>
                <p className="text-3xl font-semibold">{totalBranches}</p>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow p-6 flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-600 to-lime-500 flex items-center justify-center text-white text-2xl">
                👨‍🎓
              </div>
              <div>
                <p className="text-text-secondary text-sm">Total Students</p>
                <p className="text-3xl font-semibold">{totalStudents}</p>
              </div>
            </div>
          </div>

          {/* COLLEGES LIST */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-heading">All Colleges</h2>

              <button
                onClick={() => setShowAddCollege(true)}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md hover:opacity-90"
              >
                + Add College
              </button>
            </div>

            {loading && <p className="text-text-secondary">Loading...</p>}
            {error && (
              <p className="bg-red-100 text-red-700 px-3 py-2 rounded-md">
                {error}
              </p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
              {colleges.map((college) => (
                <div
                  key={college.college_id}
                  className="bg-white rounded-3xl shadow p-6 hover:shadow-2xl transition"
                >
                  <h3 className="text-xl font-semibold text-gray-900">
                    {college.college_name}
                  </h3>

                  <p className="text-sm text-gray-600 mt-1">
                    Code: {college.college_code}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    📍 {college.location}
                  </p>
                  <p className="text-sm text-gray-600">📞 {college.phone}</p>
                  <p className="text-sm text-gray-600">✉️ {college.email}</p>

                  <div className="mt-4 text-xs flex justify-between text-gray-500">
                    <span>Students: {college.total_students}</span>
                    <span>Branches: {college.total_branches}</span>
                  </div>

                  <button className="mt-4 text-sky-600 text-sm hover:underline">
                    View Details →
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ---------------------- ADD COLLEGE MODAL ---------------------- */}
      {showAddCollege && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-[460px] rounded-3xl p-8 shadow-2xl space-y-6">
            <h2 className="text-3xl font-heading text-center">
              Add New College
            </h2>

            {collegeError && (
              <p className="bg-red-100 text-red-600 px-3 py-2 rounded-md text-sm">
                {collegeError}
              </p>
            )}

            {/* FORM */}
            <div className="grid grid-cols-1 gap-4 text-sm">
              <input
                name="college_name"
                placeholder="College Name"
                onChange={handleCollegeChange}
                className="bg-gray-100 px-3 py-2 rounded-xl"
              />

              <input
                name="college_code"
                placeholder="College Code"
                onChange={handleCollegeChange}
                className="bg-gray-100 px-3 py-2 rounded-xl"
              />

              <input
                name="city"
                placeholder="City"
                onChange={handleCollegeChange}
                className="bg-gray-100 px-3 py-2 rounded-xl"
              />

              <input
                name="state"
                placeholder="State"
                onChange={handleCollegeChange}
                className="bg-gray-100 px-3 py-2 rounded-xl"
              />

              <input
                name="phone"
                placeholder="Phone"
                onChange={handleCollegeChange}
                className="bg-gray-100 px-3 py-2 rounded-xl"
              />

              <input
                name="email"
                type="email"
                placeholder="Email"
                onChange={handleCollegeChange}
                className="bg-gray-100 px-3 py-2 rounded-xl"
              />

              <input
                name="website"
                placeholder="Website"
                onChange={handleCollegeChange}
                className="bg-gray-100 px-3 py-2 rounded-xl"
              />
            </div>

            {/* BUTTONS */}
            <div className="flex justify-between">
              <button
                onClick={() => setShowAddCollege(false)}
                className="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>

              <button
                onClick={addCollege}
                disabled={collegeLoading}
                className="px-6 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md"
              >
                {collegeLoading ? "Saving..." : "Save College"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
