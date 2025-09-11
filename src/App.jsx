import React, { useState, useEffect } from "react";
import { prompts } from "./data/prompts";
import { tips } from "./data/tips";
import { affiliateLinks } from "./data/links";
import { affiliateLinks } from "./data/links.js";

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
  // --------------------
  // Random Prompt & Tips
  // --------------------
  const [selectedPrompt, setSelectedPrompt] = useState("");
  const [randomTip, setRandomTip] = useState("");

  const handleRandomPrompt = () => {
    setSelectedPrompt(prompts[Math.floor(Math.random() * prompts.length)]);
  };
  const handleRandomTip = () => {
    setRandomTip(tips[Math.floor(Math.random() * tips.length)]);
  };

  // --------------------
  // Link click counter (with localStorage persistence)
  // --------------------
  const [clickCounts, setClickCounts] = useState({});

  useEffect(() => {
    const saved = localStorage.getItem("clickCounts");
    if (saved) {
      setClickCounts(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("clickCounts", JSON.stringify(clickCounts));
  }, [clickCounts]);

  const trackClick = (toolName) => {
    setClickCounts((prev) => ({
      ...prev,
      [toolName]: (prev[toolName] || 0) + 1,
    }));
  };

  // --------------------
  // Calculator helpers
  // --------------------
  const fmt = (n) =>
    typeof n === "number"
      ? n.toLocaleString(undefined, { maximumFractionDigits: 2 })
      : n;

  const safeNum = (v) => {
    const n = parseFloat(v);
    return Number.isFinite(n) ? n : null;
  };

  // ROI
  const [roiInvestment, setRoiInvestment] = useState("");
  const [roiRevenue, setRoiRevenue] = useState("");
  const [roiResult, setRoiResult] = useState(null);
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

  // CPC
  const [cpcSpend, setCpcSpend] = useState("");
  const [cpcClicks, setCpcClicks] = useState("");
  const [cpcResult, setCpcResult] = useState(null);
  const calcCPC = () => {
    const spend = safeNum(cpcSpend);
    const clicks = safeNum(cpcClicks);
    if (spend === null || clicks === null || clicks <= 0) {
      setCpcResult({ error: "Enter valid spend and clicks." });
      return;
    }
    setCpcResult({ value: spend / clicks });
  };

  // Conversion Rate
  const [convVisitors, setConvVisitors] = useState("");
  const [convConversions, setConvConversions] = useState("");
  const [convResult, setConvResult] = useState(null);
  const calcConversion = () => {
    const visitors = safeNum(convVisitors);
    const conv = safeNum(convConversions);
    if (visitors === null || visitors <= 0 || conv === null) {
      setConvResult({ error: "Enter valid visitors and conversions." });
      return;
    }
    setConvResult({ value: (conv / visitors) * 100 });
  };

  // CPA
  const [cpaSpend, setCpaSpend] = useState("");
  const [cpaCustomers, setCpaCustomers] = useState("");
  const [cpaResult, setCpaResult] = useState(null);
  const calcCPA = () => {
    const spend = safeNum(cpaSpend);
    const cust = safeNum(cpaCustomers);
    if (spend === null || cust === null || cust <= 0) {
      setCpaResult({ error: "Enter valid spend and customers." });
      return;
    }
    setCpaResult({ value: spend / cust });
  };

  // CLV
  const [clvValue, setClvValue] = useState("");
  const [clvFreq, setClvFreq] = useState("");
  const [clvLife, setClvLife] = useState("");
  const [clvResult, setClvResult] = useState(null);
  const calcCLV = () => {
    const val = safeNum(clvValue);
    const freq = safeNum(clvFreq);
    const life = safeNum(clvLife);
    if (val === null || freq === null || life === null) {
      setClvResult({ error: "Enter valid numbers." });
      return;
    }
    setClvResult({ value: val * freq * life });
  };

  // Break-even
  const [beFixed, setBeFixed] = useState("");
  const [bePrice, setBePrice] = useState("");
  const [beVar, setBeVar] = useState("");
  const [beResult, setBeResult] = useState(null);
  const calcBreakEven = () => {
    const fixed = safeNum(beFixed);
    const price = safeNum(bePrice);
    const variable = safeNum(beVar);
    if (fixed === null || price === null || variable === null) {
      setBeResult({ error: "Enter valid costs and price." });
      return;
    }
    const margin = price - variable;
    if (margin <= 0) {
      setBeResult({ error: "Selling price must exceed variable cost." });
      return;
    }
    setBeResult({ value: fixed / margin });
  };

  // --------------------
  // Render
  // --------------------
  return (
    <div className="min-h-screen p-6 bg-slate-50">
      <div className="max-w-4xl mx-auto space-y-6">
        <header className="text-center">
          <h1 className="text-3xl font-bold text-purple-700">
            FreeTechyIdeas Toolbox
          </h1>
          <p className="text-sm text-gray-600 mt-2">
            Practical calculators & free tools to help you learn and earn.
          </p>
        </header>

        {/* Prompts */}
        <section className="bg-white rounded-xl shadow p-4">
          <h2 className="font-semibold text-lg">✍️ AI Prompt Generator</h2>
          <div className="flex gap-2 mt-2">
            <button
              onClick={handleRandomPrompt}
              className="px-3 py-2 bg-purple-600 text-white rounded-lg"
            >
              Get Prompt
            </button>
            <button
              onClick={() => {
                navigator.clipboard.writeText(selectedPrompt || "");
                alert("Copied!");
              }}
              className="px-3 py-2 border rounded-lg"
            >
              Copy
            </button>
          </div>
          {selectedPrompt && (
            <div className="mt-3 p-3 bg-slate-50 rounded">{selectedPrompt}</div>
          )}
        </section>

        {/* Tips */}
        <section className="bg-white rounded-xl shadow p-4">
          <h2 className="font-semibold text-lg">💡 Marketing Tips</h2>
          <button
            onClick={handleRandomTip}
            className="px-3 py-2 mt-2 bg-purple-600 text-white rounded-lg"
          >
            Get Random Tip
          </button>
          {randomTip && (
            <div className="mt-3 p-3 bg-slate-50 rounded">{randomTip}</div>
          )}
        </section>

        {/* ROI */}
        <section className="bg-white rounded-xl shadow p-4">
          <h2 className="font-semibold text-lg">📊 ROI Calculator</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
            <NumberInput
              placeholder="Investment"
              value={roiInvestment}
              setValue={setRoiInvestment}
            />
            <NumberInput
              placeholder="Revenue"
              value={roiRevenue}
              setValue={setRoiRevenue}
            />
            <button
              onClick={calcROI}
              className="px-3 py-2 bg-purple-600 text-white rounded-lg"
            >
              Calculate
            </button>
          </div>
          {roiResult?.error && (
            <p className="text-sm text-red-600 mt-3">{roiResult.error}</p>
          )}
          {roiResult?.value !== undefined && (
            <p className="mt-3">
              <strong>ROI:</strong> {fmt(roiResult.value)}%
            </p>
          )}
        </section>

        {/* CPC */}
        <section className="bg-white rounded-xl shadow p-4">
          <h2 className="font-semibold text-lg">💰 CPC Calculator</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
            <NumberInput
              placeholder="Ad Spend"
              value={cpcSpend}
              setValue={setCpcSpend}
            />
            <NumberInput
              placeholder="Clicks"
              value={cpcClicks}
              setValue={setCpcClicks}
            />
            <button
              onClick={calcCPC}
              className="px-3 py-2 bg-purple-600 text-white rounded-lg"
            >
              Calculate
            </button>
          </div>
          {cpcResult?.error && (
            <p className="text-sm text-red-600 mt-3">{cpcResult.error}</p>
          )}
          {cpcResult?.value !== undefined && (
            <p className="mt-3">
              <strong>CPC:</strong> ${fmt(cpcResult.value)}
            </p>
          )}
        </section>

        {/* Conversion Rate */}
        <section className="bg-white rounded-xl shadow p-4">
          <h2 className="font-semibold text-lg">📈 Conversion Rate Calculator</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
            <NumberInput
              placeholder="Visitors"
              value={convVisitors}
              setValue={setConvVisitors}
            />
            <NumberInput
              placeholder="Conversions"
              value={convConversions}
              setValue={setConvConversions}
            />
            <button
              onClick={calcConversion}
              className="px-3 py-2 bg-purple-600 text-white rounded-lg"
            >
              Calculate
            </button>
          </div>
          {convResult?.error && (
            <p className="text-sm text-red-600 mt-3">{convResult.error}</p>
          )}
          {convResult?.value !== undefined && (
            <p className="mt-3">
              <strong>Conversion Rate:</strong> {fmt(convResult.value)}%
            </p>
          )}
        </section>

        {/* CPA */}
        <section className="bg-white rounded-xl shadow p-4">
          <h2 className="font-semibold text-lg">📉 CPA Calculator</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
            <NumberInput
              placeholder="Ad Spend"
              value={cpaSpend}
              setValue={setCpaSpend}
            />
            <NumberInput
              placeholder="Customers Acquired"
              value={cpaCustomers}
              setValue={setCpaCustomers}
            />
            <button
              onClick={calcCPA}
              className="px-3 py-2 bg-purple-600 text-white rounded-lg"
            >
              Calculate
            </button>
          </div>
          {cpaResult?.error && (
            <p className="text-sm text-red-600 mt-3">{cpaResult.error}</p>
          )}
          {cpaResult?.value !== undefined && (
            <p className="mt-3">
              <strong>CPA:</strong> ${fmt(cpaResult.value)}
            </p>
          )}
        </section>

        {/* CLV */}
        <section className="bg-white rounded-xl shadow p-4">
          <h2 className="font-semibold text-lg">💎 CLV Calculator</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mt-2">
            <NumberInput
              placeholder="Avg Purchase Value"
              value={clvValue}
              setValue={setClvValue}
            />
            <NumberInput
              placeholder="Purchase Frequency"
              value={clvFreq}
              setValue={setClvFreq}
            />
            <NumberInput
              placeholder="Customer Lifespan (yrs)"
              value={clvLife}
              setValue={setClvLife}
            />
            <button
              onClick={calcCLV}
              className="px-3 py-2 bg-purple-600 text-white rounded-lg"
            >
              Calculate
            </button>
          </div>
          {clvResult?.error && (
            <p className="text-sm text-red-600 mt-3">{clvResult.error}</p>
          )}
          {clvResult?.value !== undefined && (
            <p className="mt-3">
              <strong>CLV:</strong> ${fmt(clvResult.value)}
            </p>
          )}
        </section>

        {/* Break-even */}
        <section className="bg-white rounded-xl shadow p-4">
          <h2 className="font-semibold text-lg">⚖️ Break-even Calculator</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mt-2">
            <NumberInput
              placeholder="Fixed Costs"
              value={beFixed}
              setValue={setBeFixed}
            />
            <NumberInput
              placeholder="Selling Price"
              value={bePrice}
              setValue={setBePrice}
            />
            <NumberInput
              placeholder="Variable Costs"
              value={beVar}
              setValue={setBeVar}
            />
            <button
              onClick={calcBreakEven}
              className="px-3 py-2 bg-purple-600 text-white rounded-lg"
            >
              Calculate
            </button>
          </div>
          {beResult?.error && (
            <p className="text-sm text-red-600 mt-3">{beResult.error}</p>
          )}
          {beResult?.value !== undefined && (
            <p className="mt-3">
              <strong>Break-even Units:</strong> {fmt(beResult.value)}
            </p>
          )}
        </section>

        {/* Recommended Tools */}
        <section className="bg-purple-50 rounded-xl p-4">
          <h3 className="font-semibold">🔥 Recommended Tools</h3>
          <p className="text-sm text-gray-700 mb-3">
            Helpful tools (affiliate links). Replace IDs in data/links.js with
            yours.
          </p>
          <div className="grid md:grid-cols-2 gap-3">
            {Object.values(affiliateLinks).map((tool, i) => (
              <a
                key={i}
                href={tool.url}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackClick(tool.name)}
                className="block p-3 bg-white rounded shadow hover:shadow-md"
              >
                <strong className="text-blue-700">
                  {tool.name}{" "}
                  <span className="text-xs text-gray-500">
                    ({clickCounts[tool.name] || 0} clicks)
                  </span>
                </strong>
                <div className="text-sm text-gray-600">{tool.description}</div>
              </a>
            ))}
          </div>
        </section>

        <footer className="text-center text-xs text-gray-500 mt-6">
          <div>
            Disclaimer: Some links may be affiliate links. We may earn a small
            commission at no extra cost to you.
          </div>
        </footer>
      </div>
    </div>
  );
}
