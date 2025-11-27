"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const API_BASE = "http://52.247.225.119:8000"; // backend API ✅

export default function CourseModulesPage() {
  const searchParams = useSearchParams();
  const moduleId = searchParams.get("module");

  const [material, setMaterial] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMaterial() {
      try {
        if (!moduleId) {
          setError("Module not found in URL");
          return;
        }

        const res = await fetch(
          `${API_BASE}/student/read-material?module=${moduleId}`,
          {
            method: "GET",
            headers: { "Accept": "application/json" },
            cache: "no-store",
          }
        );

        if (!res.ok) throw new Error(`API error ${res.status}`);

        const json = await res.json();

        // Backend returns { file_name, content }
        setMaterial({ content: json.content }); ✅
      } catch (err) {
        console.error("❌ Fetch failed:", err);
        setError("Failed to load material");
      }
    }

    if (moduleId) fetchMaterial();
  }, [moduleId]);

  if (error)
    return <div className="text-center py-20 text-red-500">{error}</div>;

  if (!material)
    return (
      <div className="text-center py-20 text-text-secondary">Loading...</div>
    );

  return (
    <div className="p-10 space-y-8 bg-main-bg min-h-screen">
      <h1 className="text-3xl font-heading font-bold">
        {`Module ${moduleId} - Study Material`}
      </h1>

      <div className="bg-white shadow-xl rounded-3xl p-8 leading-relaxed text-[15px] whitespace-pre-line">
        {material?.content || "No content available"} ✅
      </div>
    </div>
  );
}
