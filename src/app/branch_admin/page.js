"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "./components/sidebar";

const Branch = () => {
  const [branchData, setBranchData] = useState(null);
  const [studentsData, setStudentsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Add Student States
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Add Course States
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [courseLoading, setCourseLoading] = useState(false);
  const [courseError, setCourseError] = useState("");

  // Student Form
  const [studentForm, setStudentForm] = useState({
    email: "",
    password: "",
    phone: "",
    college_id: "",
    branch_id: "",
    roll_number: "",
    first_name: "",
    last_name: "",
    date_of_birth: "",
    gender: "",
    current_year: "",
  });

  // Course Form
  const [courseForm, setCourseForm] = useState({
    course_name: "",
    year: "",
    description: "",
    branch_id: "",
  });

  function handleChange(e) {
    setStudentForm({
      ...studentForm,
      [e.target.name]: e.target.value,
    });
  }

  function handleCourseChange(e) {
    setCourseForm({
      ...courseForm,
      [e.target.name]: e.target.value,
    });
  }

  // Fetch All Data
  async function fetchAll() {
    try {
      setLoading(true);

      const branchAdminId =
        localStorage.getItem("branch_admin_id") ||
        localStorage.getItem("user_id");

      if (!branchAdminId) {
        setError("Branch Admin ID not found.");
        return;
      }

      // Fetch Branch + Courses
      const courseRes = await fetch(
        `http://127.0.0.1:8000/branch-admin/courses?branch_admin_id=${branchAdminId}`
      );
      const courseJson = await courseRes.json();
      setBranchData(courseJson);

      // Update form IDs
      setStudentForm((prev) => ({
        ...prev,
        college_id: courseJson.college_id,
        branch_id: courseJson.branch_id,
      }));

      setCourseForm((prev) => ({
        ...prev,
        branch_id: courseJson.branch_id,
      }));

      // Fetch Students
      const studentsRes = await fetch(
        `http://127.0.0.1:8000/branch-admin/students?branch_admin_id=${branchAdminId}`
      );
      const studentsJson = await studentsRes.json();
      setStudentsData(studentsJson);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // Add Student API
  async function addStudent() {
    try {
      debugger
      setSubmitLoading(true);
      setSubmitError("");

      const branchAdminId =
        localStorage.getItem("branch_admin_id") ||
        localStorage.getItem("user_id");

      // 100% Reliable Payload
      const payload = {
        ...studentForm,
        college_id: localStorage.getItem('college_id'),
        branch_id: branchData.branch_id,
      };

      console.log("Sending Student:", payload);

      const res = await fetch(
        `http://127.0.0.1:8000/branch-admin/students?branch_admin_id=${branchAdminId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        const errJson = await res.json();
        throw new Error(errJson.detail || "Failed to add student");
      }

      setShowAddStudent(false);
      fetchAll();
    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setSubmitLoading(false);
    }
  }

  // Add Course API
  async function addCourse() {
    try {
      setCourseLoading(true);
      setCourseError("");

      const branchAdminId =
        localStorage.getItem("branch_admin_id") ||
        localStorage.getItem("user_id");

      const payload = {
        ...courseForm,
        branch_id: localStorage.getItem('branch_id'),
      };

      const res = await fetch(
        `http://127.0.0.1:8000/branch-admin/courses?branch_admin_id=${branchAdminId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        const errJson = await res.json();
        throw new Error(errJson.detail || "Failed to add course");
      }

      setShowAddCourse(false);
      fetchAll();
    } catch (err) {
      setCourseError(err.message);
    } finally {
      setCourseLoading(false);
    }
  }

  useEffect(() => {
    fetchAll();
  }, []);

  if (loading) return <div className="text-white p-10">Loading...</div>;

  const courses = branchData?.courses || [];
  const students = studentsData?.students || [];

  return (
    <div className="flex min-h-screen bg-page-bg p-6">
      <div className="flex flex-1 bg-sidebar-bg rounded-3xl shadow-xl overflow-hidden">
        <div className="w-64 p-8 border-border">
          <Sidebar />
        </div>

        <div className="flex-1 bg-main-bg px-14 py-10 space-y-10">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-heading">{branchData.branch_name}</h1>
              <p className="text-text-secondary mt-2 text-sm">
                Total Courses: <b>{courses.length}</b> • Total Students:{" "}
                <b>{studentsData?.total_students}</b>
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow px-6 py-4">
              <p className="text-xs text-gray-600">Branch ID</p>
              <p className="text-lg font-semibold">{branchData.branch_id}</p>
            </div>
          </div>

          {/* COURSES SECTION */}
          <section className="space-y-4">
            <div className="flex justify-between">
              <h2 className="text-2xl font-heading">Courses</h2>

              <button
                onClick={() => setShowAddCourse(true)}
                className="px-5 py-2 rounded-xl bg-blue-600 text-white"
              >
                + Add Course
              </button>
            </div>

            {courses.length === 0 ? (
              <div className="bg-white p-8 rounded-3xl shadow text-center">
                No courses found.
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {courses.map((course) => (
                  <div key={course.course_id} className="bg-white p-6 rounded-3xl border shadow">
                    <h3 className="text-lg font-semibold">{course.course_name}</h3>
                    <p className="text-xs text-gray-500 mt-1">Year: {course.year}</p>
                    <p className="text-sm text-gray-600 mt-3">{course.description}</p>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* STUDENTS SECTION */}
          <section className="space-y-4">
            <div className="flex justify-between">
              <h2 className="text-2xl font-heading">Students</h2>

              <button
                onClick={() => setShowAddStudent(true)}
                className="px-5 py-2 rounded-xl bg-pink-600 text-white"
              >
                + Add Student
              </button>
            </div>

            {students.length === 0 ? (
              <div className="bg-white p-8 rounded-3xl shadow text-center">
                No students found.
              </div>
            ) : (
              <div className="bg-white rounded-3xl shadow p-6">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="border-b bg-gray-50 text-gray-600 text-xs">
                      <th className="py-3">Roll No</th>
                      <th className="py-3">Name</th>
                      <th className="py-3">Year</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((stu, idx) => (
                      <tr key={idx} className="border-b hover:bg-gray-50">
                        <td className="py-3 text-center text-xs">{stu.roll_number}</td>
                        <td className="py-3 text-center text-xs">{stu.full_name}</td>
                        <td className="py-3 text-center text-xs">{stu.current_year}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </div>
      </div>

      {/* ADD STUDENT MODAL */}
      {showAddStudent && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white w-[450px] p-8 rounded-3xl shadow-2xl space-y-6">
            <h2 className="text-2xl font-heading text-center">Add Student</h2>

            {submitError && (
              <p className="bg-red-100 text-red-600 p-2 rounded">{submitError}</p>
            )}

            <div className="grid grid-cols-2 gap-4">
              <input name="first_name" onChange={handleChange} placeholder="First Name" className="bg-gray-100 p-2 rounded" />
              <input name="last_name" onChange={handleChange} placeholder="Last Name" className="bg-gray-100 p-2 rounded" />
              <input name="roll_number" onChange={handleChange} placeholder="Roll Number" className="bg-gray-100 p-2 rounded" />
              <input name="current_year" onChange={handleChange} type="number" placeholder="Year" className="bg-gray-100 p-2 rounded" />
              <input name="email" onChange={handleChange} type="email" placeholder="Email" className="bg-gray-100 p-2 rounded col-span-2" />
              <input name="password" onChange={handleChange} type="password" placeholder="Password" className="bg-gray-100 p-2 rounded col-span-2" />
              <input name="phone" onChange={handleChange} placeholder="Phone" className="bg-gray-100 p-2 rounded col-span-2" />
              <input name="date_of_birth" onChange={handleChange} type="date" className="bg-gray-100 p-2 rounded col-span-2" />
              <select name="gender" onChange={handleChange} className="bg-gray-100 p-2 rounded col-span-2">
                <option value="">Gender</option>
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>

            <div className="flex justify-between">
              <button onClick={() => setShowAddStudent(false)} className="px-4 py-2 bg-gray-200 rounded">
                Cancel
              </button>
              <button
                onClick={addStudent}
                disabled={submitLoading}
                className="px-6 py-2 bg-green-600 text-white rounded"
              >
                {submitLoading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD COURSE MODAL */}
      {showAddCourse && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white w-[450px] p-8 rounded-3xl shadow-2xl space-y-6">
            <h2 className="text-2xl font-heading text-center">Add Course</h2>

            {courseError && (
              <p className="bg-red-100 text-red-600 p-2 rounded">{courseError}</p>
            )}

            <div className="grid gap-4">
              <input name="course_name" onChange={handleCourseChange} placeholder="Course Name" className="bg-gray-100 p-2 rounded" />
              <input name="year" onChange={handleCourseChange} type="number" placeholder="Year" className="bg-gray-100 p-2 rounded" />
              <textarea name="description" onChange={handleCourseChange} placeholder="Description" className="bg-gray-100 p-2 rounded h-24" />
            </div>

            <div className="flex justify-between">
              <button onClick={() => setShowAddCourse(false)} className="px-4 py-2 bg-gray-200 rounded">
                Cancel
              </button>
              <button
                onClick={addCourse}
                disabled={courseLoading}
                className="px-6 py-2 bg-blue-600 text-white rounded"
              >
                {courseLoading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Branch;
