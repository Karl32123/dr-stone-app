"use client";
import { useState } from "react";
import inventions from "../../../data/inventions";

export default function Invention({ params }: { params: { name: string } }) {
  const inv = inventions.find((i) => i.name === decodeURIComponent(params.name));

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-5xl font-bold text-green-500 mb-4">{inv?.name}</h1>
      <img src={inv?.image} alt={inv?.name} className="rounded-xl mb-6 w-full" />

      <h3 className="text-2xl mb-2">Blueprint</h3>
      <img src={inv?.blueprint} className="rounded-xl my-4" />

      <h3 className="text-2xl mb-2">Scientific Truth (Physics • Chemistry • Alchemy)</h3>
      <p className="text-lg leading-relaxed">{inv?.science}</p>

      {/* Your Custom Mecha-Senku from Character.AI */}
      <div className="mecha-box bg-gray-900 p-6 rounded-2xl mt-10">
        <h3 className="text-green-400 text-2xl mb-4">Talk to Mecha-Senku (Your Custom Character)</h3>
        <iframe 
          src="https://character.ai/chat/HAQBguSV_wgKtncjSAfVT8-qaPw-2ywmdBf9zHrIJL0" 
          width="100%" 
          height="600" 
          style={{ border: "none", borderRadius: "16px" }}
          allow="clipboard-write"
        />
      </div>
    </div>
  );
}
