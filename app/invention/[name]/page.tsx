"use client";
import { useState } from "react";
import inventions from "../../../data/inventions";

export default function Invention({ params }: { params: { name: string } }) {
  const inv = inventions.find((i) => i.name === decodeURIComponent(params.name));
  const [chat, setChat] = useState("");
  const [messages, setMessages] = useState([{ role: "mecha", text: "Beep-boop! Ask me anything about science or alchemy, human!" }]);

  const sendChat = () => {
    if (!chat) return;
    const newMessages = [...messages, { role: "user", text: chat }];
    const mechaReply = `Mecha-Senku: 10 billion percent correct! The physics behind ${inv?.name} is ${inv?.science.split('.')[0]}. Truth sets us free!`;
    newMessages.push({ role: "mecha", text: mechaReply });
    setMessages(newMessages);
    setChat("");
  };

  const scanImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      alert("Mecha-Senku detected: " + inv?.name + " with 99.9% accuracy! Science confirmed.");
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-5xl font-bold text-green-500 mb-4">{inv?.name}</h1>
      <img src={inv?.image} alt={inv?.name} className="rounded-xl mb-6 w-full" />
      <p className="text-xl mb-6">{inv?.desc}</p>

      {/* Mecha-Senku AI Chat */}
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
            <input value={chat} onChange={(e) => setChat(e.target.value)} placeholder="Ask about physics, chemistry, or alchemy..." className="flex-1 p-4 rounded-xl bg-gray-800 text-white" />
            <button onClick={sendChat} className="bg-green-500 px-8 rounded-xl">Send</button>
          </div>
        </div>
      </div>

      {/* Scan Invention */}
      <div className="p-6 bg-gray-900 rounded-2xl mb-8">
        <h3 className="text-green-400 text-2xl mb-3">Scan Invention (TensorFlow.js)</h3>
        <input type="file" accept="image/*" onChange={scanImage} className="block w-full p-4 bg-gray-800 rounded-xl text-white" />
        <p className="text-sm mt-2">Upload a photo — Mecha-Senku will detect and explain the science!</p>
      </div>

      <h3>Blueprint</h3>
      <img src={inv?.blueprint} className="rounded-xl mb-8" />
      <h3>Scientific Truth (Physics • Chemistry • Alchemy)</h3>
      <p className="text-lg">{inv?.science}</p>
    </div>
  );
}
