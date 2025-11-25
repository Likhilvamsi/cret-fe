"use client";

import Sidebar from './components/sidebar'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
export default function DashboardLayout() {
    const [data, setData] = useState(null);
    const router = useRouter();
    useEffect(() => {
        async function fetchStudent() {
            const userId = localStorage.getItem("user_id"); // stored at login
            const res = await fetch(
                `http://127.0.0.1:8000/student/dashboard?user_id=${userId}`
            );
            const result = await res.json();
            setData(result);
        }

        fetchStudent();
    }, []);

    if (!data)
        return (
            <div className="flex-1 bg-main-bg px-14 py-10 flex items-center justify-center text-text-secondary">
                Loading...
            </div>
        );

    return (
        <div className="flex min-h-screen bg-page-bg p-6">
            <div className="flex flex-1 bg-sidebar-bg rounded-3xl shadow-xl overflow-hidden">

                {/* Sidebar */}
                <div className="w-64 p-8 border-border">
                    <Sidebar data={data.college} branch={data.branch} />
                </div>

                {/* DASHBOARD CONTENT */}
                <div className="flex-1 bg-main-bg px-14 py-10 space-y-10">

                    {/* ================= STUDENT HEADER CARD ================= */}
                    <div className="bg-sidebar-bg p-8 w-[50%] rounded-3xl shadow-xl flex justify-between items-center">

                        <div>
                            <h1 className="text-4xl font-heading font-bold">
                                {data.student_name}
                            </h1>

                            <p className="text-text-secondary mt-1">{data.branch}</p>

                            <div className="mt-5 flex gap-12">
                                <div>
                                    <p className="text-sm text-text-secondary">Roll No</p>
                                    <h2 className="text-xl font-semibold">{data.roll_number}</h2>
                                </div>


                                <div>
                                    <p className="text-sm text-text-secondary">Current Year</p>
                                    <h2 className="text-xl font-semibold">Year {data.current_year}</h2>
                                </div>
                            </div>
                        </div>

                        <img src="/avatar.png" className="w-20 h-20 rounded-full shadow-lg" />
                    </div>

                    {/* ================= STATS ROW ================= */}
                    <div className="grid grid-cols-3 gap-8">
                        <div className="bg-white p-6 rounded-3xl shadow-lg text-center">
                            <p className="text-xs text-text-secondary">CGPA</p>
                            <h2 className="text-4xl font-bold mt-2">{data.cgpa || "0.0"}</h2>
                        </div>

                        <div className="bg-white p-6 rounded-3xl shadow-lg text-center">
                            <p className="text-xs text-text-secondary">Subjects Total</p>
                            <h2 className="text-4xl font-bold mt-2">{data.total_subjects}</h2>
                        </div>

                        <div className="bg-white p-6 rounded-3xl shadow-lg text-center">
                            <p className="text-xs text-text-secondary">Courses Assigned</p>
                            <h2 className="text-4xl font-bold mt-2">{data.course_progress.length}</h2>
                        </div>
                    </div>

                    {/* ================= COURSE PROGRESS SECTION ================= */}
                    <div className="bg-channels-bg p-10 rounded-3xl shadow-xl relative overflow-hidden">
                        <h2 className="text-2xl font-heading mb-6">Course Modules</h2>

                        <div className="grid grid-cols-3 gap-6">

                            {/* MODULE 1 */}
                            <div
                                onClick={() => router.push("/course-modules?module=1")}
                                className="cursor-pointer bg-white p-6 rounded-3xl shadow hover:-translate-y-2 hover:shadow-xl transition text-center"
                            >
                                <div className="w-12 h-12 bg-accent-pink rounded-2xl flex items-center justify-center text-white text-lg mx-auto">
                                    📘
                                </div>

                                <h3 className="text-xl font-semibold mt-4">Module 1</h3>
                                <p className="text-text-secondary text-xs mt-1">
                                    Introduction & Fundamentals
                                </p>

                                <button className="mt-4 text-accent-pink text-xs font-semibold">
                                    View Module →
                                </button>
                            </div>

                            {/* MODULE 2 */}
                            <div
                                onClick={() => router.push("/course-modules?module=2")}
                                className="cursor-pointer bg-white p-6 rounded-3xl shadow hover:-translate-y-2 hover:shadow-xl transition text-center"
                            >
                                <div className="w-12 h-12 bg-accent-blue rounded-2xl flex items-center justify-center text-white text-lg mx-auto">
                                    📗
                                </div>

                                <h3 className="text-xl font-semibold mt-4">Module 2</h3>
                                <p className="text-text-secondary text-xs mt-1">
                                    Core Concepts & Practice
                                </p>

                                <button className="mt-4 text-accent-blue text-xs font-semibold">
                                    View Module →
                                </button>
                            </div>

                            {/* MODULE 3 (Optional) */}
                            <div
                                onClick={() => router.push("/course-modules?module=3")}
                                className="cursor-pointer bg-white p-6 rounded-3xl shadow hover:-translate-y-2 hover:shadow-xl transition text-center"
                            >
                                <div className="w-12 h-12 bg-accent-orange rounded-2xl flex items-center justify-center text-white text-lg mx-auto">
                                    📙
                                </div>

                                <h3 className="text-xl font-semibold mt-4">Module 3</h3>
                                <p className="text-text-secondary text-xs mt-1">
                                    Advanced Topics & Projects
                                </p>

                                <button className="mt-4 text-accent-orange text-xs font-semibold">
                                    View Module →
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
