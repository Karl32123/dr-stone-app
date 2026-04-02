"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import inventions from "../../data/inventions";
import * as tf from "@tensorflow/tfjs";

export default function InventionPage() {
  const params = useParams();
  const name = decodeURIComponent(params.name as string);
  const inv = inventions.find((i) => i.name === name);

  const [scanResult, setScanResult] = useState("");
  const [model, setModel] = useState<any>(null);

  useEffect(() => {
    async function loadModel() {
      const loadedModel = await tf.loadLayersModel(
        "https://tfhub.dev/google/tfjs-model/imagenet/mobilenet_v2/classification/4/default/1",
        { fromTFHub: true }
      );
      setModel(loadedModel);
    }
    loadModel();
  }, []);

  const handleScan = async (e: any) => {
    const file = e.target.files[0];
    if (!file || !model) return;

    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = async () => {
      const tensor = tf.browser.fromPixels(img)
        .resizeNearestNeighbor([224, 224])
        .toFloat()
        .div(tf.scalar(255.0))
        .expandDims();

      const predictions = await (model.predict(tensor) as tf.Tensor).data();
      const top = Array.from(predictions)
        .map((prob, i) => ({ prob, i }))
        .sort((a, b) => b.prob - a.prob)[0];

      setScanResult(`Mecha-Senku detected: "${inv?.name}" with ${(top.prob * 100).toFixed(1)}% accuracy! Science confirmed.`);
    };
  };

  if (!inv) return <div className="p-8 text-white">Invention not found.</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-100 p-8">
      {/* CARD IMAGE - FIXED WITH PLAIN IMG TAG */}
      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
        <img
          src={inv.image}
          alt={inv.name}
          className="w-full h-auto object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://picsum.photos/id/1015/800/600"; // fallback
          }}
        />
      </div>

      <div className="max-w-2xl mx-auto mt-8 bg-white rounded-3xl shadow-xl p-8">
        <h1 className="text-5xl font-bold text-center text-emerald-600">{inv.name}</h1>

        <div className="mt-6">
          <h2 className="text-2xl font-bold text-emerald-700">Mecha-Senku Says:</h2>
          <p className="text-lg mt-2">Truth is being pursued...</p>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold text-emerald-700">Blueprint Diagram</h2>
          {/* Blueprint placeholder - add your SVG later if wanted */}
          <div className="h-64 bg-stone-100 rounded-2xl flex items-center justify-center text-stone-400 mt-4">
            [Blueprint will go here]
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold text-emerald-700">Scientific Truth (Physics • Chemistry • Alchemy)</h2>
          <div className="mt-4 prose text-lg leading-relaxed">
            <p>{inv.science}</p>
          </div>
          <p className="mt-6 text-emerald-600 font-bold">{inv.real}</p>
        </div>

        <div className="mt-8 flex justify-center">
          <button className="px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xl rounded-2xl">
            Kaseki: Let&apos;s Hammer This Invention Free!
          </button>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-emerald-700">Scan Invention (TensorFlow.js)</h2>
          <div className="mt-4">
            <label className="block bg-white border-2 border-dashed border-emerald-400 rounded-2xl p-8 text-center cursor-pointer hover:bg-emerald-50">
              <input type="file" accept="image/*" onChange={handleScan} className="hidden" />
              <span className="text-emerald-600 font-bold">Choose File</span>
            </label>
            {scanResult && <p className="mt-6 text-center font-bold text-emerald-600">{scanResult}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
