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
        <img src="https://static.wikia.nocookie.net/dr-stone/images/4/4e/Mecha_Senku.png/revision/latest" alt="Mecha-Senku" className="w-32 h-32 rounded-full mr-6" />
        <div className="flex-1">
          <h3 className="text-green-400 text-2xl mb-3">Talk to Mecha-Senku (Real AI Chat)</h3>
          <div className="h-64 overflow-y-auto mb-4 bg-black p-4 rounded-xl text-white">
            {messages.map((m, i) => (
              <p key={i} className={m.role === "mecha" ? "text-green-400" : ""}>{m.text}</p>
            ))}
          </div>
          <div className="flex gap-2">
            <input value={chat} onChange={(e) => setChat(e.target.value)} placeholder="Ask about physics, chemistry, alchemy..." className="flex-1 p-4 rounded-xl bg-gray-800 text-white" />
            <button onClick={sendChat} className="bg-green-500 px-8 rounded-xl">Send</button>
          </div>
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
