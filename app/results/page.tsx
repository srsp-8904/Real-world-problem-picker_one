"use client";

import { useEffect, useState } from "react";

export default function ResultsPage() {
  const [problems, setProblems] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem("problems");

    if (stored) {
      setProblems(JSON.parse(stored));
    }
  }, []);

  if (!problems) {
    return (
      <div className="text-white p-20">
        Loading problems...
      </div>
    );
  }

  return (
    <main className="text-white p-20">
      <h1 className="text-4xl mb-10">Generated Problems</h1>

      <pre className="bg-black p-6 rounded-xl">
        {JSON.stringify(problems, null, 2)}
      </pre>
    </main>
  );
}