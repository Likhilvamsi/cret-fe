// lib/api/dashboard.js
const BASE_URL = "http://127.0.0.1:8000"; // change if needed

export async function getCollegeDashboard() {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("access_token")
      : null;

  if (!token) throw new Error("No token found. Please login again.");

  const res = await fetch(`${BASE_URL}/progress/college/dashboard`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: token, // 🔥 backend expects header -> token: <token>
    },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.detail || "Failed to load dashboard");
  }

  return res.json();
}
