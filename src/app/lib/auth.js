// lib/api/auth.js (UPDATED)

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function collegeLogin(payload) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    const msg =
      errData?.detail?.[0]?.msg ||
      errData?.message ||
      "Login failed. Please check credentials.";
    throw new Error(msg);
  }

  return res.json(); // returns user_id, role, email
}
