"use client";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center h-screen bg-[var(--background)]">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-[var(--primary)]">
          Welcome to CRT Portal
        </h1>

        <p className="mt-4 text-lg text-[var(--foreground)] opacity-80">
          A Smart Dashboard for Colleges & Students
        </p>

        <button
          className="mt-8 px-8 py-3 rounded-xl bg-accent-yellow text- text-lg shadow-lg hover:scale-105 transition"
          onClick={() => router.push("/login")}
        >
          Login to Continue
        </button>
      </div>
    </div>
  );
}
