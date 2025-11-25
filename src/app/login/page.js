"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { collegeLogin } from "../lib/auth"

export default function CollegeLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setIsSubmitting(true);

  try {
    const data = await collegeLogin({ email, password });

    // save user details
    localStorage.setItem("user_id", data.user_id);
    localStorage.setItem("role", data.role);
    localStorage.setItem("email", data.email);
   
    // navigate based on role
    if (data.role === "student") {
      router.push("/student-dashboard");
    } else if (data.role === "college_admin") {
      router.push("/dashboard");
    } else if (data.role === "branch_admin"){
       localStorage.setItem("college_id",data.college_id)
      localStorage.setItem("branch_id",data.branch_id)
      router.push("/branch_admin");
    }else if(data.role === "app_admin"){
      router.push("/admin_dashboard");
    }
  } catch (err) {
    setError(err.message);
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <div className="min-h-screen bg-page-bg flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-5xl shadow-lg rounded-3xl overflow-hidden bg-sidebar-bg">
        <div className="grid md:grid-cols-2">
          <div className="relative bg-sidebar-bg p-8 md:p-10 flex flex-col justify-between">
            <div className="absolute -top-16 -left-16 w-40 h-40 rounded-full bg-accent-pink opacity-30 blur-2xl pointer-events-none" />
            <div className="absolute -bottom-20 -right-10 w-48 h-48 rounded-full bg-accent-yellow opacity-50 blur-2xl pointer-events-none" />
            <div className="relative z-10 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-main-bg/80 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-accent-green" />
                <span className="text-xs font-medium text-text-secondary">
                  Secure College Portal
                </span>
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-text-primary leading-tight">
                  Welcome back to{" "}
                  <span className="text-accent-blue">CRT PLATFORM</span>
                  <br />
                  College Dashboard
                </h1>
                <p className="mt-3 text-sm md:text-base text-text-secondary max-w-md">
                  Sign in to manage students, attendance, reports, and all your
                  campus analytics in one clean, modern dashboard.
                </p>
              </div>

              {/* Stats / highlights */}
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="rounded-2xl bg-main-bg/90 shadow-md p-4">
                  <p className="text-xs text-text-secondary">Active Colleges</p>
                  <p className="text-xl font-semibold text-text-primary mt-1">
                    120+
                  </p>
                  <div className="mt-2 h-1.5 rounded-full bg-channels-bg overflow-hidden">
                    <div className="h-full w-3/4 bg-accent-blue" />
                  </div>
                </div>

                <div className="rounded-2xl bg-channels-bg/80 shadow-md p-4">
                  <p className="text-xs text-text-secondary">
                    Daily Analytics
                  </p>
                  <p className="text-xl font-semibold text-text-primary mt-1">
                    8.2k
                  </p>
                  <p className="mt-1 text-[11px] text-text-secondary">
                    Updated in real-time for your faculty.
                  </p>
                </div>
              </div>
            </div>

            <p className="relative z-10 mt-6 text-[11px] text-text-secondary/80">
              Tip: Use your official college email ID provided by the admin.
            </p>
          </div>

          {/* RIGHT PANEL (FORM) */}
          <div className="bg-main-bg p-8 md:p-10 flex items-center">
            <div className="w-full">
              <h2 className="text-2xl font-semibold text-text-primary mb-2">
                College Login
              </h2>
              <p className="text-sm text-text-secondary mb-6">
                Enter your credentials to access the dashboard.
              </p>

              {error && (
                <div className="mb-4 rounded-xl border border-accent-red bg-red-50 px-3 py-2 text-sm text-accent-red">
                  {error}
                </div>
              )}

              <form className="space-y-5" onSubmit={handleSubmit}>
                {/* Email */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-text-primary"
                  >
                    Email
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="college-admin@domain.edu"
                      required
                      className="w-full rounded-2xl border border-gray-200 bg-channels-bg/40 px-4 py-3 text-sm outline-none focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/30 transition"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-text-primary"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="w-full rounded-2xl border border-gray-200 bg-channels-bg/40 px-4 py-3 text-sm outline-none focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/30 transition"
                    />
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-[11px] text-text-secondary">
                      Minimum 8 characters, use a strong password.
                    </span>
                    <button
                      type="button"
                      className="text-[11px] font-medium text-accent-blue hover:underline"
                    >
                      Forgot password?
                    </button>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center rounded-2xl bg-accent-blue px-4 py-3 text-sm font-semibold text-white shadow-md hover:shadow-lg hover:brightness-110 active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed transition"
                >
                  {isSubmitting ? "Signing in..." : "Sign in to Dashboard"}
                </button>

                {/* Small caption */}
                <p className="text-[11px] text-text-secondary text-center mt-2">
                  By logging in, you agree to our{" "}
                  <span className="font-medium text-accent-pink">
                    Terms &amp; Policies
                  </span>
                  .
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
