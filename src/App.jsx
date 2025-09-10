import React, { useState } from "react";
import { prompts } from "./data/prompts";
import { tips } from "./data/tips";
import { affiliateLinks } from "./data/links";

/**
 * FreeTechyIdeas Toolbox - full Marketing Toolkit (6 calculators)
 * Copy this file to src/App.jsx and redeploy.
 */

function NumberInput({ placeholder, value, setValue }) {
  return (
    <input
      type="number"
      step="any"
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="w-full p-2 border rounded-lg"
    />
  );
}

export default function App() {
  // Prompt + Tips (kept simple)
  const [selectedPrompt, setSelectedPrompt] = useState("");
  const [randomTip, setRandomTip] = useState("");

  // ROI
  const [roiInvestment, setRoiInvestment] = useState("");
  const [roiRevenue, setRoiRevenue] = useState("");
  const [roiResult, setRoiResult] = useState(null);

  // CPC
  const [cpcSpend, setCpcSpend] = useState("");
  const [cpcClicks, setCpcClicks] = useState("");
  const [cpcResult, setCpcResult] = useState(null);

  // Conversion Rate
  const [crVisitors, setCrVisitors] = useState("");
  const [crConversions, setCrConversions] = useState("");
  const [crResult, setCrResult] = useState(null);

  // CPA
  const [cpaSpend, setCpaSpend] = useState("");
  const [cpaCustomers, setCpaCustomers] = useState("");
  const [cpaResult, setCpaResult] = useState(null);

  // CLV
  const [clvAvgOrder, setClvAvgOrder] = useState("");
  const [clvFreq, setClvFreq] = useState("");
  const [clvYears, setClvYears] = useState("");
  const [clvResult, setClvResult] = useState(null);

  // Break-even
  const [beFixedCosts, setBeFixedCosts] = useState("");
  const [bePrice, setBePrice] = useState("");
  const [beVariable, setBeVariable] = useState("");
  const [beResult, setBeResult] = useState(null);

  // Helpers
  const safeNum = (v) => {
    const n = parseFloat(v);
    return Number.isFinite(n) ? n : null;
  };

  // Actions
  const handleRandomPrompt = () => {
    if (!prompts || prompts.length === 0) return;
    setSelectedPrompt(prompts[Math.floor(Math.random() * prompts.length)]);
  };
  const handleRandomTip = () => {
    if (!tips || tips.length === 0) return;
    setRandomTip(tips[Math.floor(Math.random() * tips.length)]);
  };

  const calcROI = () => {
    const invest = safeNum(roiInvestment);
    const rev = safeNum(roiRevenue);
    if (invest === null || invest <= 0 || rev === null) {
      setRoiResult({ error: "Enter valid investment (>0) and revenue." });
      return;
    }
    const roi = ((rev - invest) / invest) * 100;
    setRoiResult({ value: roi });
  };

  const calcCPC = () => {
    const spend = safeNum(cpcSpend);
    const clicks = safeNum(cpcClicks);
    if (spend === null || clicks === null || clicks <= 0) {
      setCpcResult({ error: "Enter valid ad spend and clicks (>0)." });
      return;
    }
    setCpcResult({ value: spend / clicks });
  };

  const calcCR = () => {
    const visitors = safeNum(crVisitors);
    const conversions = safeNum(crConversions);
    if (visitors === null || visitors <= 0 || conversions === null) {
      setCrResult({ error: "Enter valid visitors (>0) and conversions." });
      return;
    }
    setCrResult({ value: (conversions / visitors) * 100 });
  };

  const calcCPA = () => {
    const spend = safeNum(cpaSpend);
    const customers = safeNum(cpaCustomers);
    if (spend === null || customers === null || customers <= 0) {
      setCpaResult({ error: "Enter valid ad spend and number of customers (>0)." });
      return;
    }
    setCpaResult({ value: spend / customers });
  };

  const calcCLV = () => {
    const avg = safeNum(clvAvgOrder);
    const freq = safeNum(clvFreq);
    const years = safeNum(clvYears);
    if (avg === null || freq === null || years === null) {
      setClvResult({ error: "Enter valid average order, frequency, and years." });
      return;
    }
    setClvResult({ value: avg * freq * years });
  };

  const calcBreakEven = () => {
    const fixed = safeNum(beFixedCosts);
    const price = safeNum(bePrice);
    const variable = safeNum(beVariable);
    if (fixed === null || price === null || variable === null || price <= variable) {
      setBeResult({ error: "Ensure fixed cost, price, and variable cost are valid, and price > variable cost." });
      return;
    }
    setBeResult({ value: Math.ceil(fixed / (price - variable)) }); // units
  };

  // Small UI helper for showing numbers
  const fmt = (n) => (typeof n === "number" ? n.toLocaleString(undefined, { maximumFractionDigits: 2 }) : n);

  return (
    <div className="min-h-screen p-6 bg-slate-50">
      <div className="max-w-4xl mx-auto space-y-6">
        <header className="text-center">
          <h1 className="text-3xl font-bold text-purple-700">FreeTechyIdeas Toolbox</h1>
          <p className="text-sm text-gray-600 mt-2">Practical calculators & free tools to help you learn and earn.</p>
        </header>

        {/* --- Prompts --- */}
        <section className="bg-white rounded-xl shadow p-4">
          <h2 className="font-semibold text-lg">✍️ AI Prompt Generator</h2>
          <p className="text-sm text-gray-600 mb-3">Click to get a ready prompt you can use in ChatGPT or other AI tools.</p>
          <div className="flex gap-2">
            <button onClick={handleRandomPrompt} className="px-3 py-2 bg-purple-600 text-white rounded-lg">Get Prompt</button>
            <button onClick={() => { navigator.clipboard.writeText(selectedPrompt || ""); alert("Copied!"); }} className="px-3 py-2 border rounded-lg">Copy</button>
          </div>
          {selectedPrompt && <div className="mt-3 p-3 bg-slate-50 rounded">{selectedPrompt}</div>}
        </section>

        {/* --- Marketing Toolkit (all calculators) --- */}
        <section className="bg-white rounded-xl shadow p-4 space-y-6">
          <h2 className="font-semibold text-lg">📊 Marketing Toolkit</h2>
          <p className="text-sm text-gray-600">Six practical calculators — enter values, click calculate, get results & tips.</p>

          {/* ROI */}
          <div className="border rounded p-3">
            <h3 className="font-medium">ROI Calculator</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
              <NumberInput placeholder="Investment (e.g., 500)" value={roiInvestment} setValue={setRoiInvestment} />
              <NumberInput placeholder="Revenue (e.g., 1200)" value={roiRevenue} setValue={setRoiRevenue} />
              <div className="flex gap-2">
                <button onClick={calcROI} className="px-3 py-2 bg-purple-600 text-white rounded-lg">Calculate</button>
                <button onClick={() => { setRoiInvestment(""); setRoiRevenue(""); setRoiResult(null); }} className="px-3 py-2 border rounded-lg">Clear</button>
              </div>
            </div>
            <div className="mt-3">
              {roiResult && roiResult.error && <div className="text-sm text-red-600">{roiResult.error}</div>}
              {roiResult && roiResult.value !== undefined && (
                <div>
                  <strong>ROI:</strong> {fmt(roiResult.value)}%
                  <p className="text-sm text-gray-700 mt-2">
                    💡 Pro Tip: Find high-value keywords to increase revenue using <a href={affiliateLinks.seoTool.url} target="_blank" rel="noreferrer" className="text-blue-600 underline">{affiliateLinks.seoTool.name}</a>.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* CPC */}
          <div className="border rounded p-3">
            <h3 className="font-medium">CPC Calculator (Cost Per Click)</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
              <NumberInput placeholder="Total Ad Spend (e.g., 500)" value={cpcSpend} setValue={setCpcSpend} />
              <NumberInput placeholder="Number of Clicks (e.g., 2000)" value={cpcClicks} setValue={setCpcClicks} />
              <div className="flex gap-2">
                <button onClick={calcCPC} className="px-3 py-2 bg-purple-600 text-white rounded-lg">Calculate</button>
                <button onClick={() => { setCpcSpend(""); setCpcClicks(""); setCpcResult(null); }} className="px-3 py-2 border rounded-lg">Clear</button>
              </div>
            </div>
            <div className="mt-3">
              {cpcResult && cpcResult.error && <div className="text-sm text-red-600">{cpcResult.error}</div>}
              {cpcResult && cpcResult.value !== undefined && (
                <div>
                  <strong>CPC:</strong> ${fmt(cpcResult.value)}
                  <p className="text-sm text-gray-700 mt-2">
                    💡 Pro Tip: If CPC is high, test ad creatives or try keyword targeting tools like <a href={affiliateLinks.seoTool.url} target="_blank" rel="noreferrer" className="text-blue-600 underline">{affiliateLinks.seoTool.name}</a>.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Conversion Rate */}
          <div className="border rounded p-3">
            <h3 className="font-medium">Conversion Rate Calculator</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
              <NumberInput placeholder="Visitors (e.g., 2000)" value={crVisitors} setValue={setCrVisitors} />
              <NumberInput placeholder="Conversions (e.g., 150)" value={crConversions} setValue={setCrConversions} />
              <div className="flex gap-2">
                <button onClick={calcCR} className="px-3 py-2 bg-purple-600 text-white rounded-lg">Calculate</button>
                <button onClick={() => { setCrVisitors(""); setCrConversions(""); setCrResult(null); }} className="px-3 py-2 border rounded-lg">Clear</button>
              </div>
            </div>
            <div className="mt-3">
              {crResult && crResult.error && <div className="text-sm text-red-600">{crResult.error}</div>}
              {crResult && crResult.value !== undefined && (
                <div>
                  <strong>Conversion Rate:</strong> {fmt(crResult.value)}%
                  <p className="text-sm text-gray-700 mt-2">
                    💡 Pro Tip: Improve conversion with simple landing pages — try recommended builders in the Recommended Tools section below.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* CPA */}
          <div className="border rounded p-3">
            <h3 className="font-medium">CPA Calculator (Cost Per Acquisition)</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
              <NumberInput placeholder="Total Ad Spend (e.g., 1000)" value={cpaSpend} setValue={setCpaSpend} />
              <NumberInput placeholder="Number of Customers (e.g., 50)" value={cpaCustomers} setValue={setCpaCustomers} />
              <div className="flex gap-2">
                <button onClick={calcCPA} className="px-3 py-2 bg-purple-600 text-white rounded-lg">Calculate</button>
                <button onClick={() => { setCpaSpend(""); setCpaCustomers(""); setCpaResult(null); }} className="px-3 py-2 border rounded-lg">Clear</button>
              </div>
            </div>
            <div className="mt-3">
              {cpaResult && cpaResult.error && <div className="text-sm text-red-600">{cpaResult.error}</div>}
              {cpaResult && cpaResult.value !== undefined && (
                <div>
                  <strong>CPA:</strong> ${fmt(cpaResult.value)}
                  <p className="text-sm text-gray-700 mt-2">
                    💡 Pro Tip: Lower CPA by improving ad targeting or funnels — analytics tools like <a href={affiliateLinks.seoTool.url} target="_blank" rel="noreferrer" className="text-blue-600 underline">{affiliateLinks.seoTool.name}</a> help diagnose leaks.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* CLV */}
          <div className="border rounded p-3">
            <h3 className="font-medium">CLV Calculator (Customer Lifetime Value)</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mt-2">
              <NumberInput placeholder="Avg Order Value (e.g., 50)" value={clvAvgOrder} setValue={setClvAvgOrder} />
              <NumberInput placeholder="Purchases/year (e.g., 5)" value={clvFreq} setValue={setClvFreq} />
              <NumberInput placeholder="Customer lifespan (years) (e.g., 3)" value={clvYears} setValue={setClvYears} />
              <div className="flex gap-2">
                <button onClick={calcCLV} className="px-3 py-2 bg-purple-600 text-white rounded-lg">Calculate</button>
                <button onClick={() => { setClvAvgOrder(""); setClvFreq(""); setClvYears(""); setClvResult(null); }} className="px-3 py-2 border rounded-lg">Clear</button>
              </div>
            </div>
            <div className="mt-3">
              {clvResult && clvResult.error && <div className="text-sm text-red-600">{clvResult.error}</div>}
              {clvResult && clvResult.value !== undefined && (
                <div>
                  <strong>CLV:</strong> ${fmt(clvResult.value)}
                  <p className="text-sm text-gray-700 mt-2">
                    💡 Pro Tip: Increase CLV with email automation — consider <a href={affiliateLinks.emailTool.url} target="_blank" rel="noreferrer" className="text-blue-600 underline">{affiliateLinks.emailTool.name}</a>.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Break-even */}
          <div className="border rounded p-3">
            <h3 className="font-medium">Break-even Calculator (units)</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mt-2">
              <NumberInput placeholder="Fixed Costs (e.g., 10000)" value={beFixedCosts} setValue={setBeFixedCosts} />
              <NumberInput placeholder="Price per unit (e.g., 50)" value={bePrice} setValue={setBePrice} />
              <NumberInput placeholder="Variable cost per unit (e.g., 30)" value={beVariable} setValue={setBeVariable} />
              <div className="flex gap-2">
                <button onClick={calcBreakEven} className="px-3 py-2 bg-purple-600 text-white rounded-lg">Calculate</button>
                <button onClick={() => { setBeFixedCosts(""); setBePrice(""); setBeVariable(""); setBeResult(null); }} className="px-3 py-2 border rounded-lg">Clear</button>
              </div>
            </div>
            <div className="mt-3">
              {beResult && beResult.error && <div className="text-sm text-red-600">{beResult.error}</div>}
              {beResult && beResult.value !== undefined && (
                <div>
                  <strong>Break-even Units:</strong> {fmt(beResult.value)} units
                  <p className="text-sm text-gray-700 mt-2">
                    💡 Pro Tip: If you need hosting for an e-commerce store, consider <a href={affiliateLinks.hosting.url} target="_blank" rel="noreferrer" className="text-blue-600 underline">{affiliateLinks.hosting.name}</a>.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* --- Tips --- */}
        <section className="bg-white rounded-xl shadow p-4">
          <h2 className="font-semibold text-lg">💡 Tech Tips Randomizer</h2>
          <p className="text-sm text-gray-600 mb-3">Click to get a practical quick tip.</p>
          <div className="flex gap-2">
            <button onClick={handleRandomTip} className="px-3 py-2 bg-purple-600 text-white rounded-lg">Get Tip</button>
            <button onClick={() => navigator.clipboard.writeText(randomTip || "")} className="px-3 py-2 border rounded-lg">Copy</button>
          </div>
          {randomTip && <div className="mt-3 p-3 bg-slate-50 rounded">{randomTip}</div>}
        </section>

        {/* --- Recommended Tools --- */}
        <section className="bg-purple-50 rounded-xl p-4">
          <h3 className="font-semibold">🔥 Recommended Tools</h3>
          <p className="text-sm text-gray-700 mb-3">Helpful tools (affiliate links). Replace IDs in data/links.js with yours.</p>
          <div className="grid md:grid-cols-2 gap-3">
            {Object.values(affiliateLinks).map((t, i) => (
              <a key={i} href={t.url} target="_blank" rel="noreferrer" className="block p-3 bg-white rounded shadow hover:shadow-md">
                <strong className="text-blue-700">{t.name}</strong>
                <div className="text-sm text-gray-600">{t.description}</div>
              </a>
            ))}
          </div>
        </section>

        <footer className="text-center text-xs text-gray-500 mt-6">
          <div>Disclaimer: Some links may be affiliate links. We may earn a small commission at no extra cost to you.</div>
        </footer>
      </div>
    </div>
  );
}
