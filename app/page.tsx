"use client";
import { useState, useEffect } from "react";
import inventions from "../data/inventions";
import Link from "next/link";

export default function Home() {
  const [search, setSearch] = useState("");
  const [completed, setCompleted] = useState<string[]>([]);
  const [showTree, setShowTree] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("drstoneCompleted");
    if (saved) setCompleted(JSON.parse(saved));
  }, []);

  const isUnlocked = (inv: any) => inv.requires.every((r: string) => completed.includes(r));

  const treeHTML = (
    <div className="text-center text-white">
      <h2 className="text-4xl font-bold text-green-500 mb-8">Invention Tree — Kingdom of Science</h2>
      <div className="flex flex-col items-center gap-6 text-xl">
        {inventions.map((inv, index) => (
          <div key={inv.name} className="flex flex-col items-center">
            <div className={`px-12 py-6 rounded-2xl font-bold ${isUnlocked(inv) ? 'bg-green-600' : 'bg-gray-700 opacity-70'}`}>
              {inv.name} {isUnlocked(inv) ? '✅ UNLOCKED' : '🔒 LOCKED'}
            </div>
            {index < inventions.length - 1 && <div className="text-6xl text-green-400 my-2">↓</div>}
          </div>
        ))}
      </div>
      <p className="mt-8 text-green-300">Stone Tools is the root. Everything builds from here. Click any invention on the main page to view/edit science.</p>
    </div>
  );

  return (
    <div className="p-8 min-h-screen bg-stone-950 text-white">
      <h1 className="text-5xl font-bold text-green-500 text-center mb-4">Dr. STONE Truth Roadmap</h1>
      <p className="text-center mb-8">Pursue the Truth That Sets You Free — Stone to Stars, One Honest Discovery at a Time! 10 Billion Percent!</p>

      <button 
        onClick={() => setShowTree(true)}
        className="block mx-auto mb-8 px-10 py-5 bg-emerald-600 hover:bg-emerald-700 text-2xl font-bold rounded-2xl"
      >
        Invention Tree (Unlocked Overview)
      </button>

      <input
        type="text"
        placeholder="Search inventions..."
        className="block mx-auto mb-8 p-4 border border-green-700 bg-stone-900 rounded-xl w-full max-w-md text-white"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {inventions.filter((i) => i.name.toLowerCase().includes(search.toLowerCase())).map((inv) => (
          <div key={inv.name} className={`p-6 rounded-3xl border-2 ${isUnlocked(inv) ? 'border-green-500 bg-green-950' : 'border-gray-700 bg-stone-900'}`}>
            <h2 className="text-3xl font-bold text-green-400">{inv.name}</h2>
            <p className="mt-3 text-lg">{inv.desc}</p>
            <div className="mt-4 flex items-center gap-3">
              <span className={`px-4 py-1 rounded-full text-sm ${isUnlocked(inv) ? 'bg-green-600' : 'bg-gray-700'}`}>
                {isUnlocked(inv) ? 'UNLOCKED' : 'LOCKED'}
              </span>
              <Link 
                href={`/invention/${encodeURIComponent(inv.name)}`} 
                className="text-blue-400 hover:text-blue-300 font-bold"
              >
                View / Edit Details →
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Tree Modal */}
      {showTree && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-8" onClick={() => setShowTree(false)}>
          <div className="bg-stone-900 p-8 rounded-3xl max-w-2xl w-full" onClick={e => e.stopPropagation()}>
            {treeHTML}
            <button 
              onClick={() => setShowTree(false)}
              className="mt-8 w-full py-4 bg-red-600 hover:bg-red-700 rounded-2xl text-xl"
            >
              Close Tree
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
