"use client";
import { useState } from "react";
import inventions from "../../../data/inventions";

export default function Invention({ params }: { params: { name: string } }) {
  const inv = inventions.find((i) => i.name === decodeURIComponent(params.name));
  const [chat, setChat] = useState("");
  const [messages, setMessages] = useState([{ role: "mecha", text: "Beep-boop! Ask me about science, alchemy, or truth — 10 billion percent ready!" }]);

  const sendChat = async () => {
    if (!chat) return;
    const newMessages = [...messages, { role: "user", text: chat }];
    setMessages(newMessages);
    setChat("");

    // Smarter AI call to real API (use xAI or OpenAI key)
    const response = await fetch('https://api.openai.com/v1/chat/completions', {  // Replace with xAI API if preferred
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_API_KEY'  // Get free key from openai.com or xAI
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',  // Or 'grok-beta' for xAI
        messages: [{ role: 'system', content: 'You are Mecha-Senku, a robot from Dr. STONE. Respond in character: Robotic, excited about science, use "10 billion percent" and focus on truth that sets free, physics, chemistry, alchemy.' },
          { role: 'user', content: chat }]
      })
    });
    const data = await response.json();
    const mechaReply = data.choices[0].message.content;
    setMessages([...newMessages, { role: "mecha", text: mechaReply }]);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-5xl font-bold text-green-500 mb-4">{inv?.name}</h1>
      <img src={inv?.image} alt={inv?.name} className="rounded-xl mb-6 w-full" />

      {/* Smarter Mecha-Senku AI Chat */}
      <div className="mecha-box bg-gray-900 p-6 rounded-2xl mb-8">
        <img src="https://static.wikia.nocookie.net/dr-stone/images/4/4e/Mecha_Senku.png/revision/latest" alt="Mecha-Senku" className="w-32 h-32 rounded-full mr-6" />
        <div className="flex-1">
          <h3 className="text-green-400 text-2xl mb-3">Talk to Mecha-Senku (Smarter Real AI Chat)</h3>
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

      <h3>Blueprint</h3>
      <img src={inv?.blueprint} className="rounded-xl my-4" />
      <h3>Scientific Truth (Physics • Chemistry • Alchemy)</h3>
      <p className="text-lg leading-relaxed">{inv?.science}</p>
    </div>
  );
}
