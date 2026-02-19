"use client";
import { useState, useEffect } from "react";
import inventions from "../data/inventions";
import Link from "next/link";

export default function Home() {
  const [search, setSearch] = useState("");
  const [completed, setCompleted] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("drstoneCompleted");
    if (saved) setCompleted(JSON.parse(saved));
  }, []);

  const isUnlocked = (inv: any) => inv.requires.every((r: string) => completed.includes(r));

  return (
    <div className="p-8 min-h-screen">
      <h1 className="text-5xl font-bold text-green-500 text-center mb-4">Dr. STONE Truth Roadmap</h1>
      <p className="text-center mb-8">Pursue the Truth That Sets You Free — Stone to Stars, One Honest Discovery at a Time! 10 Billion Percent!</p>
      <input
        type="text"
        placeholder="Search inventions..."
        className="block mx-auto mb-8 p-4 border rounded-lg w-full max-w-md"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {inventions.filter((i) => i.name.toLowerCase().includes(search.toLowerCase())).map((inv) => (
          <div key={inv.name} className={`card ${isUnlocked(inv) ? '' : 'opacity-50'}`}>
            <h2 className="text-2xl font-bold text-green-600">{inv.name}</h2>
            <p>{inv.desc}</p>
            {isUnlocked(inv) ? <Link href={`/invention/${encodeURIComponent(inv.name)}`} className="text-blue-500">View Details</Link> : <p>Locked — Master prereqs!</p>}
          </div>
        ))}
      </div>
    </div>
  );
}