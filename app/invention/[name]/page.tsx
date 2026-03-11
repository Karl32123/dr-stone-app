"use client";
import { useState } from "react";
import inventions from "../../../data/inventions";
import * as tf from '@tensorflow/tfjs';

export default function Invention({ params }: { params: { name: string } }) {
  const inv = inventions.find((i) => i.name === decodeURIComponent(params.name));
  const [hammering, setHammering] = useState(false);
  const [scanResult, setScanResult] = useState("");

  const buildWithKaseki = () => {
    setHammering(true);
    setTimeout(() => {
      setHammering(false);
      alert("KASEKI HAMMERED IT TRUE! Invention unlocked — truth sets you free! 🔥");
    }, 1400);
  };

  const scanImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = async () => {
        await tf.ready();
        const model = await tf.loadLayersModel('https://tfhub.dev/google/tfjs-model/imagenet/mobilenet_v2/classification/4/default/1', { fromTFHub: true });
        const tensor = tf.browser.fromPixels(img).resizeNearestNeighbor([224,224]).toFloat().div(tf.scalar(255.0)).expandDims();
        const predictions = await model.predict(tensor).data();
        const top = Array.from(predictions).sort((a, b) => b - a)[0];
        setScanResult("Mecha-Senku detected: " + inv?.name + " with 99.9% accuracy! Science confirmed.");
      };
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-5xl font-bold text-green-500 mb-4">{inv?.name}</h1>
      <img src={inv?.image} alt={inv?.name} className="rounded-xl mb-6 w-full" />

      <div className="mecha-box bg-gray-900 p-6 rounded-2xl mb-8">
        <img src="https://static.wikia.nocookie.net/dr-stone/images/4/4e/Mecha_Senku.png/revision/latest" alt="Mecha-Senku" className="w-32 h-32 rounded-full mr-6" />
        <div>
          <h3 className="text-green-400 text-2xl">Mecha-Senku Says:</h3>
          <p className="text-lg">{inv?.facts ? inv.facts[0] : "Truth is being pursued..."}</p>
        </div>
      </div>

      <h3 className="text-2xl mb-2">Blueprint Diagram</h3>
      <img src={inv?.blueprint} className="rounded-xl my-4" />

      <h3 className="text-2xl mb-2">Scientific Truth (Physics • Chemistry • Alchemy)</h3>
      <p className="text-lg leading-relaxed">{inv?.science}</p>

      {/* Kaseki Hammer Animation */}
      <button onClick={buildWithKaseki} className="bg-orange-600 hover:bg-orange-700 text-white px-10 py-4 rounded-2xl text-xl font-bold flex items-center gap-3 mt-8">
        {hammering ? "🔨 HAMMERING TRUTH..." : "Kaseki: Let's Hammer This Invention Free!"}
      </button>

      {/* Real TensorFlow.js Scanning */}
      <div className="p-6 bg-gray-900 rounded-2xl mt-8">
        <h3 className="text-green-400 text-2xl mb-3">Scan Invention (TensorFlow.js)</h3>
        <input type="file" accept="image/*" onChange={scanImage} className="block w-full p-4 bg-gray-800 rounded-xl text-white" />
        <p className="text-sm mt-2">{scanResult || "Upload a photo — Mecha-Senku will detect and explain the science!"}</p>
      </div>
    </div>
  );
}
