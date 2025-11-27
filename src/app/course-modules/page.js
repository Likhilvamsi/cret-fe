"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function CourseModulesPage() {
  const searchParams = useSearchParams();
  const moduleId = searchParams.get("module");

  const [material, setMaterial] = useState(null);

  useEffect(() => {
    async function fetchMaterial() {
      try {
        const res = await fetch(
          `http://52.247.225.119:8000/student/read-material?module=${moduleId}`,
          {
            method: "GET",
            headers: { "Accept": "application/json" }
          }
        );

        if (!res.ok) throw new Error(`Server error: ${res.status}`);

        const data = await res.json();
        setMaterial(data);
      } catch (err) {
        console.error("❌ Fetch failed:", err);
        setMaterial({ content: "Failed to load material" });
      }
    }

    if (moduleId) fetchMaterial();
  }, [moduleId]);

  if (!material)
    return <div className="text-center py-20 text-text-secondary">Loading...</div>;

  return (
    <div className="p-10 space-y-8 bg-main-bg min-h-screen">
      <h1 className="text-3xl font-heading font-bold">
        {`Module ${moduleId} - Study Material`}
      </h1>

      <div className="bg-white shadow-xl rounded-3xl p-8 leading-relaxed text-[15px] whitespace-pre-line">
        {material.content || "No content available"}
      </div>
    </div>
  );
}
