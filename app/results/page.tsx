"use client";

import Link from "next/link";

const problems = [
  {
    id: 1,
    title: "AI for Rural Healthcare Diagnostics",
    description:
      "Design a system that helps rural clinics detect early-stage diseases using AI-powered analysis tools.",
    tags: ["AI / ML", "Healthcare", "Intermediate"],
  },
  {
    id: 2,
    title: "Smart Waste Monitoring System",
    description:
      "Build a smart solution that optimizes waste collection routes using real-time data tracking.",
    tags: ["Smart Cities", "IoT", "Beginner"],
  },
  {
    id: 3,
    title: "Student Dropout Prediction Tool",
    description:
      "Create an analytics platform that predicts at-risk students using behavioral and academic data.",
    tags: ["Education", "Data", "Advanced"],
  },
  {
    id: 4,
    title: "Carbon Footprint Tracker",
    description:
      "Develop a web application that tracks and visualizes individual or business carbon usage.",
    tags: ["Sustainability", "Web", "Beginner"],
  },
  {
    id: 5,
    title: "Public Transport Delay Predictor",
    description:
      "Use real-time transit data to predict delays and improve commuter experience.",
    tags: ["Logistics", "AI", "Intermediate"],
  },
  {
    id: 6,
    title: "Accessible Learning Companion",
    description:
      "Build a tool that helps visually impaired students consume digital educational content more easily.",
    tags: ["Accessibility", "Education", "Impact"],
  },
];

export default function Results() {
  return (
    <main className="min-h-screen text-white px-8 md:px-20 py-32">
      {/* HEADER */}
      <div className="mb-20">
        <h1 className="text-5xl md:text-6xl font-light">
          Real-world problems for you
        </h1>
        <p className="mt-6 text-gray-400 max-w-2xl">
          Explore meaningful problems aligned with your interests and
          technical direction.
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {problems.map((problem) => (
          <div
            key={problem.id}
            className="
              group
              rounded-3xl
              border border-white/10
              bg-white/5
              backdrop-blur-md
              p-8
              transition-all
              duration-500
              hover:scale-[1.03]
              hover:border-orange-400/40
            "
          >
            {/* TITLE */}
            <h2 className="text-2xl font-medium group-hover:text-orange-300 transition">
              {problem.title}
            </h2>

            {/* DESCRIPTION */}
            <p className="mt-5 text-gray-400 text-sm leading-relaxed">
              {problem.description}
            </p>

            {/* TAGS */}
            <div className="mt-6 flex flex-wrap gap-3">
              {problem.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-gray-300 bg-white/10 px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* OPEN BUTTON */}
            <div className="mt-8">
              <Link
                href="#"
                className="relative inline-flex items-center text-sm text-white group/link"
              >
                <span className="mr-2">Open</span>
                <span className="transition-transform duration-300 group-hover/link:translate-x-2">
                  →
                </span>

                <span className="absolute left-0 -bottom-1 h-[1px] w-full bg-white scale-x-0 origin-left transition-transform duration-300 group-hover/link:scale-x-100"></span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
