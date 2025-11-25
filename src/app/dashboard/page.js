"use client";

import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

export default function DashboardLayout() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const userId = localStorage.getItem("user_id"); 
    
      if (!userId) return;
      try {
        const res = await fetch(
          `http://127.0.0.1:8000/college-admin/dashboard?college_admin_id=${userId}`,
          {
            method: "GET",
            headers: { Accept: "application/json" },
          }
        );

        const result = await res.json();
        setData(result);
      } catch (error) {
        console.error("Dashboard Fetch Error:", error);
      }
    }

    fetchData();
  }, []);

  if (!data) return <div className="text-white p-10">Loading...</div>;
    const coll_id = data.colleges?.[0]?.college_id;
      const college_id = localStorage.setItem("college_id",coll_id)
  return (
    <div className="flex min-h-screen bg-page-bg p-6">
      <div className="flex flex-1 bg-sidebar-bg rounded-3xl shadow-xl overflow-hidden">

        {/* Sidebar */}
        <div className="w-64 p-8 border-border">
          <Sidebar />
        </div>

        {/* Content */}
        <div className="flex-1 bg-main-bg px-14 py-10">
          
          <div className="space-y-10">

            {/* ===== TOP SUMMARY (TEXT UPDATED) ===== */}
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-5xl font-heading">{data.college_name}</h1>

                <div className="flex gap-18 mt-8">

                  <div className="flex flex-col gap-1">
                    <p className="text-sm text-text-secondary">Total Students</p>
                    <h2 className="text-2xl">{data.total_students}</h2>
                  </div>

                  <div className="flex flex-col gap-1">
                    <p className="text-sm text-text-secondary">Avg CGPA</p>
                    <h2 className="text-2xl">{data.average_cgpa}</h2>
                  </div>

                  <div className="flex flex-col gap-1">
                    <p className="text-sm text-text-secondary">Branches</p>
                    <h2 className="text-2xl">{data.students_per_branch?.length || 0}</h2>
                  </div>

                </div>
              </div>
            </div>

            {/* ===== PERFORMANCE OVERVIEW ===== */}
            <div className="grid grid-cols-[1.7fr_1.3fr] gap-10 items-start">

              <div className="bg-card-bg p-6 rounded-3xl">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h2 className="text-xl font-heading">Performance Overview</h2>
                    <p className="text-xs text-text-secondary mt-1">
                      Total Students: {data.total_students}
                    </p>
                  </div>

                  <button className="px-4 py-1 rounded-full border border-border text-xs text-text-secondary bg-white flex items-center gap-2">
                    Current Year ▾
                  </button>
                </div>

                {/* Chart Body Same */}
                <div className="relative h-48 mt-2">
                  <svg className="absolute inset-0 w-full h-full">
                    <line x1="0" y1="15%" x2="100%" y2="15%" stroke="#F0F0F0" strokeWidth="1" />
                    <line x1="0" y1="35%" x2="100%" y2="35%" stroke="#F0F0F0" strokeWidth="1" />
                    <line x1="0" y1="55%" x2="100%" y2="55%" stroke="#F0F0F0" strokeWidth="1" />
                    <line x1="0" y1="75%" x2="100%" y2="75%" stroke="#F0F0F0" strokeWidth="1" />
                    <path
                      d="M5,140 C60,80 120,110 170,90 C220,70 280,110 340,80"
                      fill="none"
                      stroke="var(--accent-yellow)"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </svg>

                  <div className="absolute left-1/2 top-[38%] -translate-x-1/2">
                    <div className="bg-white px-4 py-2 rounded-2xl shadow text-center">
                      <p className="text-sm font-bold">{data.average_cgpa}</p>
                      <p className="text-[10px] text-text-secondary">Average CGPA</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* ===== TOP PERFORMERS ===== */}
              <div className="p-2">
                <h2 className="text-xl font-heading mb-4">Top Performers</h2>

                <div className="space-y-5 text-sm">
                  {data.student_performance_list.slice(0, 3).map((student, i) => (
                    <div key={i} className="flex items-center justify-between">

                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-accent-blue"></div>
                        <div>
                          <p className="font-semibold text-text-primary">{student.student_name}</p>
                          <p className="text-text-secondary text-xs">{student.roll_number}</p>
                        </div>
                      </div>

                      <span className="font-semibold text-text-primary">{student.cgpa}</span>

                    </div>
                  ))}
                </div>

                <button className="mt-5 text-xs font-medium text-text-secondary flex items-center gap-1">
                  View More <span>›</span>
                </button>
              </div>

            </div>

            {/* ===== BRANCHES SECTION ===== */}
            <div className="bg-channels-bg rounded-3xl p-10 shadow-sm">
              <div className="grid grid-cols-6 gap-6 items-center">

                <div className="col-span-1">
                  <h2 className="text-2xl font-heading mb-2">Branches</h2>
                  <p className="text-text-secondary leading-[1.6]">
                    Total Branches:{" "}
                    <span className="font-bold text-text-primary">
                      {data.students_per_branch.length}
                    </span>
                  </p>
                </div>

                <div className="col-span-4 flex gap-6">
                  {data.students_per_branch.map((branch, index) => (
                    <div key={index} className="bg-white p-6 rounded-3xl shadow text-center w-36">
                      <span className="w-10 h-10 bg-accent-pink rounded-full inline-flex items-center justify-center text-white mb-3">
                        🎓
                      </span>
                      <h4 className="font-semibold">{branch.branch_name}</h4>
                      <p className="text-accent-pink text-3xl font-bold mt-2">
                        {branch.student_count}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="col-span-1 bg-accent-green p-6 rounded-3xl shadow text-white font-bold text-center">
                  Full<br />Stats →
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
