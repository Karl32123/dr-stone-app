"use client";
import { useState, useEffect } from "react";
import inventions from "../data/inventions";
import Link from "next/link";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"tree" | "current" | "favourites" | "mastered">("tree");
  const [completed, setCompleted] = useState<string[]>([]);
  const [favourites, setFavourites] = useState<string[]>([]);
  const [mastered, setMastered] = useState<string[]>([]);
  const [currentWorkingOn, setCurrentWorkingOn] = useState<string | null>(null);

  useEffect(() => {
    const savedCompleted = localStorage.getItem("drstoneCompleted");
    const savedFavourites = localStorage.getItem("drstoneFavourites");
    const savedMastered = localStorage.getItem("drstoneMastered");
    const savedCurrent = localStorage.getItem("drstoneCurrent");
    if (savedCompleted) setCompleted(JSON.parse(savedCompleted));
    if (savedFavourites) setFavourites(JSON.parse(savedFavourites));
    if (savedMastered) setMastered(JSON.parse(savedMastered));
    if (savedCurrent) setCurrentWorkingOn(savedCurrent);
  }, []);

  const saveCompleted = (newCompleted: string[]) => {
    setCompleted(newCompleted);
    localStorage.setItem("drstoneCompleted", JSON.stringify(newCompleted));
  };
  const saveFavourites = (newFavs: string[]) => {
    setFavourites(newFavs);
    localStorage.setItem("drstoneFavourites", JSON.stringify(newFavs));
  };
  const saveMastered = (newMastered: string[]) => {
    setMastered(newMastered);
    localStorage.setItem("drstoneMastered", JSON.stringify(newMastered));
  };
  const saveCurrent = (name: string | null) => {
    setCurrentWorkingOn(name);
    if (name) localStorage.setItem("drstoneCurrent", name);
    else localStorage.removeItem("drstoneCurrent");
  };

  const isUnlocked = (inv: any) => inv.requires.every((r: string) => completed.includes(r));

  const toggleFavourite = (name: string) => {
    if (favourites.includes(name)) {
      saveFavourites(favourites.filter(n => n !== name));
    } else {
      saveFavourites([...favourites, name]);
    }
  };

  const toggleMastered = (name: string) => {
    if (mastered.includes(name)) {
      saveMastered(mastered.filter(n => n !== name));
    } else {
      saveMastered([...mastered, name]);
    }
  };

  const markCompleted = (name: string) => {
    if (!completed.includes(name)) {
      saveCompleted([...completed, name]);
    }
  };

  const setAsCurrent = (name: string) => {
    saveCurrent(name);
    setActiveTab("current");
  };

  const currentInv = currentWorkingOn ? inventions.find(i => i.name === currentWorkingOn) : null;

  const renderCard = (inv: any, showExtra: boolean = true) => (
    <div key={inv.name} className={`p-6 rounded-3xl border-2 ${isUnlocked(inv) ? 'border-green-500 bg-green-950' : 'border-gray-700 bg-stone-900'} hover:scale-105 transition`}>
      <h2 className="text-3xl font-bold text-green-400">{inv.name}</h2>
      <p className="mt-3 text-lg">{inv.desc}</p>
      <div className="mt-4 flex flex-wrap gap-3">
        <span className={`px-4 py-1 rounded-full text-sm ${isUnlocked(inv) ? 'bg-green-600' : 'bg-gray-700'}`}>
          {isUnlocked(inv) ? 'UNLOCKED' : 'LOCKED'}
        </span>
        <Link href={`/invention/${encodeURIComponent(inv.name)}`} className="text-blue-400 hover:text-blue-300 font-bold">
          View / Edit Details →
        </Link>
        {showExtra && (
          <>
            <button onClick={() => toggleFavourite(inv.name)} className="text-yellow-400 hover:text-yellow-300">
              {favourites.includes(inv.name) ? '★' : '☆'} Favourite
            </button>
            <button onClick={() => toggleMastered(inv.name)} className="text-purple-400 hover:text-purple-300">
              {mastered.includes(inv.name) ? '✓ Mastered' : '○ Learn'}
            </button>
            <button onClick={() => markCompleted(inv.name)} className="text-emerald-400 hover:text-emerald-300">
              Mark Completed
            </button>
            <button onClick={() => setAsCurrent(inv.name)} className="text-orange-400 hover:text-orange-300">
              Set as Current
            </button>
          </>
        )}
      </div>
    </div>
  );

  return (
    <div className="p-8 min-h-screen bg-stone-950 text-white">
      <h1 className="text-5xl font-bold text-green-500 text-center mb-2">Dr. STONE Truth Roadmap</h1>
      <p className="text-center mb-8 text-emerald-300">Pursue the Truth That Sets You Free — Stone to Stars, One Honest Discovery at a Time! 10 Billion Percent!</p>

      {/* TABS */}
      <div className="flex justify-center gap-2 mb-10 flex-wrap">
        {[
          { key: "tree", label: "Invention Tree" },
          { key: "current", label: "Currently Working On" },
          { key: "favourites", label: "Favourites" },
          { key: "mastered", label: "Mastered" }
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`px-8 py-4 text-xl font-bold rounded-2xl transition ${activeTab === tab.key ? 'bg-emerald-600 text-white' : 'bg-stone-800 hover:bg-stone-700'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TREE TAB */}
      {activeTab === "tree" && (
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-green-500 mb-8">Invention Tree — Kingdom of Science</h2>
          <div className="flex flex-col items-center gap-6 text-xl">
            {inventions.map((inv, index) => (
              <div key={inv.name} className="flex flex-col items-center">
                <div className={`px-12 py-6 rounded-2xl font-bold w-full text-center ${isUnlocked(inv) ? 'bg-green-600' : 'bg-gray-700 opacity-70'}`}>
                  <Link href={`/invention/${encodeURIComponent(inv.name)}`} className="hover:underline">
                    {inv.name}
                  </Link>
                  <span className="ml-4 text-sm">{isUnlocked(inv) ? '✅ UNLOCKED' : '🔒 LOCKED'}</span>
                </div>
                {index < inventions.length - 1 && <div className="text-6xl text-green-400 my-2">↓</div>}
              </div>
            ))}
          </div>
          <p className="mt-12 text-emerald-300">Every invention is visible and one click away. Stone Tools is the root of everything.</p>
        </div>
      )}

      {/* CURRENTLY WORKING ON TAB */}
      {activeTab === "current" && (
        <div className="max-w-2xl mx-auto">
          {currentInv ? (
            <div>
              <h2 className="text-4xl font-bold text-orange-400 text-center mb-6">Currently Working On</h2>
              {renderCard(currentInv, true)}
            </div>
          ) : (
            <div className="text-center text-2xl text-gray-400">
              No invention selected yet.<br />Go to Tree or any list and click “Set as Current” to focus on the next truth!
            </div>
          )}
        </div>
      )}

      {/* FAVOURITES TAB */}
      {activeTab === "favourites" && (
        <div>
          <h2 className="text-4xl font-bold text-yellow-400 text-center mb-8">Favourites ★</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {inventions.filter(inv => favourites.includes(inv.name)).length > 0 ? (
              inventions.filter(inv => favourites.includes(inv.name)).map(inv => renderCard(inv))
            ) : (
              <p className="text-center text-2xl text-gray-400 col-span-full">No favourites yet — star some inventions!</p>
            )}
          </div>
        </div>
      )}

      {/* MASTERED TAB */}
      {activeTab === "mastered" && (
        <div>
          <h2 className="text-4xl font-bold text-purple-400 text-center mb-8">Mastered ✓</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {inventions.filter(inv => mastered.includes(inv.name)).length > 0 ? (
              inventions.filter(inv => mastered.includes(inv.name)).map(inv => renderCard(inv))
            ) : (
              <p className="text-center text-2xl text-gray-400 col-span-full">Nothing mastered yet — mark inventions as learned when you know the truth!</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
