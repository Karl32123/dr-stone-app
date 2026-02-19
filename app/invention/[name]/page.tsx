"use client";
import { useState } from "react";
import inventions from "../../../data/inventions";

export default function Invention({ params }: { params: { name: string } }) {
  const inv = inventions.find((i) => i.name === decodeURIComponent(params.name));
  const [completed, setCompleted] = useState<string[]>(JSON.parse(localStorage.getItem("drstoneCompleted") || "[]"));

  const complete = () => {
    const newCompleted = [...completed, inv?.name || ""];
    localStorage.setItem("drstoneCompleted", JSON.stringify(newCompleted));
    setCompleted(newCompleted);
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-green-500">{inv?.name}</h1>
      <p>{inv?.desc}</p>
      <img src="mecha-senku.png" alt="Mecha-Senku explaining" className="my-4" /> {/* Replace with actual link */}
      <p>Mecha-Senku: {inv?.facts[0]}</p>
      <ul>
        {inv?.requires.map((r) => <li className={completed.includes(r) ? "text-green-500" : "text-gray-500"}>{r}</li>)}
      </ul>
      <div>
        <img src="kaseki.png" alt="Kaseki" />
        <p>Kaseki: Ready to hammer this truth?</p>
        <button onClick={complete} className="bg-green-500 p-2">Build & Unlock</button>
      </div>
      <p>Real Truth: {inv?.real}</p>
    </div>
  );
}