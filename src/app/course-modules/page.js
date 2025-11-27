"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function ModuleContent() {
  const searchParams = useSearchParams();
  const moduleId = searchParams.get("module");

  const [material, setMaterial] = useState(null);

  useEffect(() => {
    async function fetchMaterial() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/student/read-material`);
        const data = await res.json();
        setMaterial(data);
      } catch (error) {
        console.error("API Fetch Error:", error);
        setMaterial({ content: "Failed to load study material." });
      }
    }
    fetchMaterial();
  }, [moduleId]);

  if (!material) return <div>Loading...</div>;

  return (
    <div className="p-10 space-y-8 bg-main-bg min-h-screen">
      <h1 className="text-3xl font-bold">{`Module ${moduleId} - Study Material`}</h1>
      <div className="bg-white shadow-xl rounded-3xl p-8 whitespace-pre-line">
        {material.content}
      </div>
    </div>
  );
}

export default function CourseModulesPage() {
  return (
    <Suspense fallback={<div>Loading page...</div>}>
      <ModuleContent />
    </Suspense>
  );
}
