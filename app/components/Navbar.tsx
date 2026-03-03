"use client";

import { useRef } from "react";
import { Space_Grotesk } from "next/font/google";
import { useRouter } from "next/navigation";
const rwppFont = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600"],
});

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

export default function Navbar() {
  const navRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = navRef.current?.getBoundingClientRect();
    if (!rect || !navRef.current) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    navRef.current.style.setProperty("--x", `${x}px`);
    navRef.current.style.setProperty("--y", `${y}px`);
    navRef.current.style.setProperty("--opacity", "1");
  }

  function handleMouseLeave() {
    navRef.current?.style.setProperty("--opacity", "0");
  }

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-center no-select">
      <div className="mt-5">
        <div
          ref={navRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="
            relative
            flex items-center justify-between
            px-6 py-3
            w-[520px] md:w-[640px]
            rounded-3xl
            bg-white/20
            backdrop-blur-2xl
            border border-white/40
            overflow-hidden
          "
        >
          <div
            className="pointer-events-none absolute inset-0 transition-opacity duration-300"
            style={{
              opacity: "var(--opacity)",
              background:
                "radial-gradient(220px circle at var(--x) var(--y), rgba(255,255,255,0.35), transparent 60%)",
            }}
          />

          <span
  onClick={() => smoothScrollTo(0)}
  className={`${rwppFont.className} relative z-10 text-[17px] font-semibold tracking-[0.04em] text-white cursor-pointer`}
>
  SolveSpace
</span>

          <div className="relative z-10 flex items-center gap-6 text-sm text-white">
            <button
  onClick={() => router.push("/want-to-work")}
  className="
    relative isolate
    px-5 py-2
    rounded-full
    bg-white/30
    backdrop-blur-md
    border border-white/50
    font-semibold
    transition-all
    duration-300
    hover:bg-white/40
    hover:scale-[1.04]
    active:scale-[0.98]
  "
>
  Want to Work
</button>


            <button
              onClick={() => {
                const section = document.getElementById("domains");
                if (!section) return;
                smoothScrollTo(
                  section.getBoundingClientRect().top + window.scrollY
                );
              }}
              className="relative group"
            >
              Explore
              <span className="absolute left-0 -bottom-1 h-[1px] w-full bg-white/80 scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
