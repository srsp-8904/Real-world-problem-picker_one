"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function WantToWork() {
  /* Cursor glow – safe */
  useEffect(() => {
    let rafId: number | null = null;
    let idleTimer: ReturnType<typeof setTimeout> | null = null;

    const onMove = (e: MouseEvent) => {
      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        document.documentElement.style.setProperty("--x", `${e.clientX}px`);
        document.documentElement.style.setProperty("--y", `${e.clientY}px`);
        document.documentElement.style.setProperty("--glow-opacity", "1");
        rafId = null;
      });

      if (idleTimer) clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        document.documentElement.style.setProperty("--glow-opacity", "0");
      }, 250);
    };

    const hideGlow = () => {
      document.documentElement.style.setProperty("--glow-opacity", "0");
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("blur", hideGlow);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("blur", hideGlow);
      if (idleTimer) clearTimeout(idleTimer);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  /* State for "Other" */
  const [primaryDomain, setPrimaryDomain] = useState("");
  const [otherDomain, setOtherDomain] = useState("");

  return (
    <main className="min-h-screen text-white px-6 md:px-24 py-32 select-none flex justify-center">
      <div className="w-full max-w-3xl">
        {/* TITLE */}
        <h1 className="text-6xl font-light text-center">
          What do you want to work on?
        </h1>

        {/* DESCRIPTION */}
        <p className="mt-6 text-xl text-gray-300 text-center max-w-2xl mx-auto">
          Select your interests below. SolveSpace will help you discover
          real-world problems that fit your domain and skillset.
        </p>

        {/* FORM */}
        <form className="mt-20 space-y-10">
          {/* PRIMARY DOMAIN */}
          <div className="space-y-3">
            <label className="block text-lg text-gray-200">
              Primary Domain <span className="text-orange-400">*</span>
            </label>

            <select
              required
              value={primaryDomain}
              onChange={(e) => setPrimaryDomain(e.target.value)}
              className="
                w-full
                bg-black
                text-white
                border border-white/30
                rounded-xl
                px-4 py-3
                text-base
                focus:outline-none
                focus:border-white/60
                transition
                appearance-none
              "
            >
              <option value="" disabled>
                Select an option
              </option>
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

            {/* SHOW ONLY IF "OTHER" */}
            {primaryDomain === "Other" && (
              <input
                type="text"
                required
                value={otherDomain}
                onChange={(e) => setOtherDomain(e.target.value)}
                placeholder="Enter your domain"
                className="
                  mt-4
                  w-full
                  bg-black
                  text-white
                  border border-white/30
                  rounded-xl
                  px-4 py-3
                  text-base
                  focus:outline-none
                  focus:border-white/60
                  transition
                "
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

          {/* ACTION */}
          <div className="pt-20 flex justify-center">
            <button
              type="submit"
              className="
                px-10 py-3
                rounded-full
                bg-white/30
                backdrop-blur-md
                border border-white/40
                text-white
                text-lg
                font-medium
                hover:bg-white/40
                transition
              "
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
        className="
          w-full
          bg-black
          text-white
          border border-white/30
          rounded-xl
          px-4 py-3
          text-base
          focus:outline-none
          focus:border-white/60
          transition
          appearance-none
        "
      >
        <option value="" disabled>
          Select an option
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt} className="bg-black text-white">
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
