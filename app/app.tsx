import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-4xl font-bold mb-4">
          Discover Real-World Problems Developers Can Solve
        </h2>
        <p className="text-gray-600 max-w-xl mb-6">
          Explore industry-based real-world problems, understand what is already
          solved, and identify opportunities where software solutions can make
          an impact.
        </p>

        <a
          href="/explore"
          className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
        >
          Explore Domains
        </a>
      </main>
    </>
  );
}
