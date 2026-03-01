"use client";
import { useState } from "react";
import inventions from "../../../data/inventions";

export default function Invention({ params }: { params: { name: string } }) {
  const inv = inventions.find((i) => i.name === decodeURIComponent(params.name));
  const [chat, setChat] = useState("");
  const [messages, setMessages] = useState([{ role: "mecha", text: "Beep-boop! Ask me anything about science, alchemy, or truth — 10 billion percent ready!" }]);
  const [hammering, setHammering] = useState(false);

  const sendChat = () => {
    if (!chat) return;
    const newMessages = [...messages, { role: "user", text: chat }];
    const mechaReply = `Mecha-Senku: Truth confirmed! The ${inv?.name} uses ${inv?.science.split('.')[0]}. This honest discovery sets humanity free — just like the Christian pursuit of ultimate truth!`;
    newMessages.push({ role: "mecha", text: mechaReply });
    setMessages(newMessages);
    setChat("");
  };

  const buildWithKaseki = () => {
    setHammering(true);
    setTimeout(() => {
      setHammering(false);
      alert("KASEKI HAMMERED IT TRUE! Invention unlocked — truth sets you free! 🔥");
    }, 1200);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-5xl font-bold text-green-500 mb-4">{inv?.name}</h1>
      <img src={inv?.image} alt={inv?.name} className="rounded-xl mb-6 w-full" />

      {/* Canonical Mecha-Senku AI Chat */}
<div className="mecha-box bg-gray-900 p-6 rounded-2xl mb-8">
  <iframe 
    width="320" 
    height="180" 
    src="https://www.youtube.com/embed/1nzOBg0xPAA?autoplay=1&loop=1&playlist=1nzOBg0xPAA&mute=0" 
    allow="autoplay" 
    title="Mecha-Senku talking" 
    frameborder="0" 
    allowfullscreen
  ></iframe>
  <div className="flex-1 ml-6">
    <h3 className="text-green-400 text-2xl mb-3">Mecha-Senku is Alive & Talking!</h3>
    <p id="fact"></p>
    <button onClick={newFact} className="bg-green-500 px-8 py-3 rounded-xl">New Fact (he speaks & moves)</button>
  </div>
</div>
      {/* Kaseki Hammer Animation */}
      <button onClick={buildWithKaseki} className="bg-orange-600 hover:bg-orange-700 text-white px-10 py-4 rounded-2xl text-xl font-bold flex items-center gap-3">
        {hammering ? "🔨 HAMMERING TRUTH..." : "Kaseki: Let's Hammer This Invention Free!"}
      </button>

      <h3 className="mt-8 text-2xl">Blueprint</h3>
      <img src={inv?.blueprint} className="rounded-xl my-4" />

      <h3 className="text-2xl">Scientific Truth (Physics • Chemistry • Alchemy)</h3>
      <p className="text-lg leading-relaxed">{inv?.science}</p>
    </div>
  );
}
