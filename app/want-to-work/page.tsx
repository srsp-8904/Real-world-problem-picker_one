"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function WantToWork() {
  const router = useRouter();

  const [primaryDomain, setPrimaryDomain] = useState("");
  const [otherDomain, setOtherDomain] = useState("");

  /* Cursor glow */
  useEffect(() => {
    let rafId: number | null = null;

    const onMove = (e: MouseEvent) => {
      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        document.documentElement.style.setProperty("--x", `${e.clientX}px`);
        document.documentElement.style.setProperty("--y", `${e.clientY}px`);
        rafId = null;
      });
    };

    window.addEventListener("mousemove", onMove);

    return () => {
      window.removeEventListener("mousemove", onMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  /* 🔥 Handle submit */
  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const domain = primaryDomain === "Other" ? otherDomain : primaryDomain;

  try {
    const res = await fetch("http://localhost:5000/api/generate-problems", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: domain,
      }),
    });

    const data = await res.json();

    console.log("Backend response:", data);

    // store problems
    localStorage.setItem("problems", JSON.stringify(data));

    // navigate
    router.push("/results");
  } catch (err) {
    console.error("Error calling backend:", err);
  }
};

  return (
    <main className="min-h-screen text-white px-6 md:px-24 py-32 select-none flex justify-center">
      <div className="w-full max-w-3xl">

        <h1 className="text-6xl font-light text-center">
          What do you want to work on?
        </h1>

        <p className="mt-6 text-xl text-gray-300 text-center max-w-2xl mx-auto">
          Select your interests below. SolveSpace will help you discover
          real-world problems that fit your domain and skillset.
        </p>

        {/* 🔥 form handler added */}
        <form onSubmit={handleSubmit} className="mt-20 space-y-10">

          {/* PRIMARY DOMAIN */}
          <div className="space-y-3">
            <label className="block text-lg text-gray-200">
              Primary Domain <span className="text-orange-400">*</span>
            </label>

            <select
              required
              value={primaryDomain}
              onChange={(e) => setPrimaryDomain(e.target.value)}
              className="w-full bg-black text-white border border-white/30 rounded-xl px-4 py-3"
            >
              <option value="" disabled>Select an option</option>
              <option>Web Development</option>
              <option>Artificial Intelligence / ML</option>
              <option>Healthcare</option>
              <option>Education</option>
              <option>Finance</option>
              <option>Sustainability / Climate</option>
              <option>Smart Cities</option>
              <option>Accessibility</option>
              <option>Logistics</option>
              <option>Other</option>
            </select>

            {primaryDomain === "Other" && (
              <input
                type="text"
                required
                value={otherDomain}
                onChange={(e) => setOtherDomain(e.target.value)}
                placeholder="Enter your domain"
                className="mt-4 w-full bg-black text-white border border-white/30 rounded-xl px-4 py-3"
              />
            )}
          </div>

          {/* AREA OF INTEREST */}
          <Select
            label="Area of Interest"
            required
            options={[
              "Automation",
              "Data & Analytics",
              "User Experience",
              "Monitoring & Tracking",
              "Decision Support",
              "Security",
              "Optimization",
              "General Exploration",
            ]}
          />

          {/* TECH COMFORT */}
          <Select
            label="Technical Comfort"
            required
            options={[
              "Frontend",
              "Backend",
              "Full-stack",
              "AI / ML",
              "Mobile apps",
              "Open to learning",
            ]}
          />

          {/* PLATFORM */}
          <Select
            label="Preferred Platform"
            required
            options={[
              "Web application",
              "Mobile application",
              "Automation tool",
              "Dashboard / analytics",
              "API / backend service",
              "AI-powered tool",
            ]}
          />

          {/* COMPLEXITY */}
          <Select
            label="Complexity Preference"
            required
            options={[
              "Beginner-friendly",
              "Intermediate",
              "Challenging",
              "Doesn’t matter",
            ]}
          />

          {/* BUTTON */}
          <div className="pt-20 flex justify-center">
            <button
              type="submit"
              className="px-10 py-3 rounded-full bg-white/30 backdrop-blur-md border border-white/40 text-white text-lg font-medium hover:bg-white/40 transition"
            >
              Discover problems
            </button>
          </div>

        </form>
      </div>
    </main>
  );
}

/* Reusable Select */
function Select({
  label,
  options,
  required = false,
}: {
  label: string;
  options: string[];
  required?: boolean;
}) {
  return (
    <div className="space-y-3">
      <label className="block text-lg text-gray-200">
        {label}
        {required && <span className="ml-1 text-orange-400">*</span>}
      </label>

      <select
        required={required}
        defaultValue=""
        className="w-full bg-black text-white border border-white/30 rounded-xl px-4 py-3"
      >
        <option value="" disabled>Select an option</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}