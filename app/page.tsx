"use client";

import Navbar from "./components/Navbar";
import { useLayoutEffect, useEffect } from "react";

/* Smooth scroll helper with easing */
function smoothScrollTo(targetY: number) {
  const startY = window.scrollY;
  const distance = targetY - startY;
  const duration = 800;
  const startTime = performance.now();

  function scroll(currentTime: number) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    const ease =
      progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

    window.scrollTo(0, startY + distance * ease);

    if (progress < 1) requestAnimationFrame(scroll);
  }

  requestAnimationFrame(scroll);
}

export default function Home() {
  /* Cursor glow tracking */
  useEffect(() => {
    let rafId = 0;

    const move = (e: MouseEvent) => {
      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        document.documentElement.style.setProperty("--x", `${e.clientX}px`);
        document.documentElement.style.setProperty("--y", `${e.clientY}px`);
        rafId = 0;
      });
    };

    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  /* Force page to start at top on reload */
  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  /* Explore → domains scroll */
  const handleExploreClick = () => {
    const section = document.getElementById("domains");
    if (section) {
      const y = section.getBoundingClientRect().top + window.scrollY;
      smoothScrollTo(y);
    }
  };

  return (
    <>
      <Navbar />

      {/* HERO SECTION */}
      <main className="relative min-h-screen text-white overflow-hidden flex items-center no-select">
        <div className="relative z-10 w-full px-12 md:px-24">
          <h1 className="text-[64px] md:text-[96px] font-light leading-[1.05] max-w-5xl">
            <span className="font-normal">Choose a domain.</span>
            <br />
            Work on real-world problems that matter.
          </h1>

          <p className="mt-10 text-lg text-gray-300 max-w-xl">
            A focused platform where you explore domains of interest and
            contribute to solving real-world challenges through technology
            and ideas.
          </p>

          <div className="mt-14">
            <button
              onClick={handleExploreClick}
              className="group relative inline-flex items-center text-lg font-medium text-white"
            >
              <span className="mr-2">Explore</span>
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-2">
                →
              </span>
              <span className="absolute left-0 -bottom-1 h-[1px] w-full bg-white scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
            </button>
          </div>
        </div>
      </main>

      {/* DOMAINS SECTION */}
      <section
        id="domains"
        className="text-white px-12 md:px-24 py-32"
      >
        <div className="max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-light leading-tight">
            Explore domains where <br />
            real-world problems exist.
          </h2>

          <p className="mt-8 text-gray-400 max-w-xl">
            Choose the fields you’re interested in and work on solving
            problems that actually exist outside classrooms and tutorials.
          </p>

          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              {
                title: "Artificial Intelligence",
                desc: "Work on real-world problems involving automation, intelligence, and data-driven systems.",
              },
              {
                title: "Web Development",
                desc: "Build scalable and meaningful web-based solutions for real users and problems.",
              },
              {
                title: "Healthcare",
                desc: "Explore challenges in medical systems, accessibility, and digital health solutions.",
              },
              {
                title: "Education",
                desc: "Solve problems related to learning, accessibility, and modern education systems.",
              },
              {
                title: "Sustainability",
                desc: "Focus on environmental challenges and long-term sustainable solutions.",
              },
              {
                title: "Smart Cities",
                desc: "Design solutions that improve urban life using technology and data.",
              },
            ].map((domain) => (
              <div
                key={domain.title}
                className="group cursor-pointer transition-all duration-500 ease-out hover:scale-[1.06]"
              >
                <h3 className="text-xl font-normal group-hover:opacity-80 transition spark-hover">
                  {domain.title}
                </h3>

                <span className="block mt-3 h-[1px] w-10 bg-white/40 group-hover:w-20 transition-all duration-300"></span>

                <p className="mt-4 text-sm text-gray-400 max-w-xs opacity-0 translate-y-2 max-h-0 overflow-hidden transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 group-hover:max-h-40">
                  {domain.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
