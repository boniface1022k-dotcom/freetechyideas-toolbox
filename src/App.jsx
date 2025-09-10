import { useState } from "react";
import { prompts } from "./data/prompts";
import { tips } from "./data/tips";
import { affiliateLinks } from "./data/links";

export default function App() {
  const [selectedPrompt, setSelectedPrompt] = useState("");
  const [randomTip, setRandomTip] = useState("");
  const [investment, setInvestment] = useState("");
  const [revenue, setRevenue] = useState("");
  const [roi, setRoi] = useState(null);

  // ROI Calculator
  const calculateROI = () => {
    const inv = parseFloat(investment);
    const rev = parseFloat(revenue);
    if (!isNaN(inv) && !isNaN(rev) && inv > 0) {
      const result = ((rev - inv) / inv) * 100;
      setRoi(result);
    }
  };

  // Random Prompt
  const getRandomPrompt = () => {
    const randomIndex = Math.floor(Math.random() * prompts.length);
    setSelectedPrompt(prompts[randomIndex]);
  };

  // Random Tip
  const getRandomTip = () => {
    const randomIndex = Math.floor(Math.random() * tips.length);
    setRandomTip(tips[randomIndex]);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-purple-700 mb-6">
        🚀 FreeTechyIdeas Toolbox
      </h1>

      {/* AI Prompt Generator */}
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">✍️ AI Prompt Generator</h2>
        <button
          onClick={getRandomPrompt}
          className="px-4 py-2 bg-purple-600 text-white rounded-xl shadow hover:bg-purple-700 transition"
        >
          Get a Random Prompt
        </button>
        {selectedPrompt && (
          <p className="mt-4 text-gray-700">{selectedPrompt}</p>
        )}
      </div>

      {/* Marketing Toolkit - ROI Calculator */}
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">📊 ROI Calculator</h2>
        <div className="space-y-2">
          <input
            type="number"
            placeholder="Enter Investment"
            value={investment}
            onChange={(e) => setInvestment(e.target.value)}
            className="w-full p-2 border rounded-lg"
          />
          <input
            type="number"
            placeholder="Enter Revenue"
            value={revenue}
            onChange={(e) => setRevenue(e.target.value)}
            className="w-full p-2 border rounded-lg"
          />
          <button
            onClick={calculateROI}
            className="px-4 py-2 bg-purple-600 text-white rounded-xl shadow hover:bg-purple-700 transition"
          >
            Calculate ROI
          </button>
        </div>
        {roi !== null && (
          <div className="mt-4">
            <p className="text-lg">
              Your ROI is: <strong>{roi.toFixed(2)}%</strong>
            </p>
            <p className="mt-2 text-sm text-gray-700">
              💡 Pro Tip: Use {affiliateLinks.seoTool.name}{" "}
              <a
                href={affiliateLinks.seoTool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                ({affiliateLinks.seoTool.url})
              </a>{" "}
              to find profitable keywords and boost your ROI.
            </p>
          </div>
        )}
      </div>

      {/* Tech Tips Randomizer */}
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">💡 Tech Tips Randomizer</h2>
        <button
          onClick={getRandomTip}
          className="px-4 py-2 bg-purple-600 text-white rounded-xl shadow hover:bg-purple-700 transition"
        >
          Get a Random Tip
        </button>
        {randomTip && <p className="mt-4 text-gray-700">{randomTip}</p>}
      </div>

      {/* Recommended Tools Section */}
      <div className="w-full max-w-2xl bg-purple-50 rounded-2xl shadow-md p-6">
        <h2 className="text-xl font-bold mb-3">🔥 Recommended Tools</h2>
        <ul className="space-y-2">
          {Object.values(affiliateLinks).map((tool, i) => (
            <li
              key={i}
              className="p-3 bg-white rounded-xl shadow hover:shadow-md transition"
            >
              <a
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 font-semibold hover:underline"
              >
                {tool.name}
              </a>
              <p className="text-sm text-gray-600">{tool.description}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Disclaimer */}
      <footer className="mt-12 text-center text-gray-500 text-sm">
        <p>
          Disclaimer: Some links may be affiliate links. We may earn a small
          commission at no extra cost to you.
        </p>
      </footer>
    </div>
  );
}


