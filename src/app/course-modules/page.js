"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function CourseModulesPage() {
  const searchParams = useSearchParams();
  const moduleId = searchParams.get("module");

  const [material, setMaterial] = useState(null);

  useEffect(() => {
    async function fetchMaterial() {
      const res = await fetch("http://127.0.0.1:8000/student/read-material");
      const data = await res.json();
      setMaterial(data);
    }
    fetchMaterial();
  }, [moduleId]);

  if (!material)
    return <div className="text-center py-20 text-text-secondary">Loading...</div>;

  return (
    <div className="p-10 space-y-8 bg-main-bg min-h-screen">

      <h1 className="text-3xl font-heading font-bold">
        {`Module ${moduleId} - Study Material`}
      </h1>

      <div className="bg-white shadow-xl rounded-3xl p-8 leading-relaxed text-[15px] whitespace-pre-line">
        {material.content}
      </div>

    </div>
  );
}
