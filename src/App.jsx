import React, { useState } from "react";

function App() {
  const [tab, setTab] = useState("prompts");

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-center mb-6">FreeTechyIdeas Toolbox</h1>
      <div className="flex justify-center space-x-4 mb-6">
        <button onClick={() => setTab("prompts")} className="px-4 py-2 bg-blue-500 text-white rounded-lg">AI Prompts</button>
        <button onClick={() => setTab("marketing")} className="px-4 py-2 bg-green-500 text-white rounded-lg">Marketing Toolkit</button>
        <button onClick={() => setTab("tips")} className="px-4 py-2 bg-purple-500 text-white rounded-lg">Tech Tips</button>
      </div>

      {tab === "prompts" && (
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="font-bold mb-2">AI Prompt Generator</h2>
          <p>Example prompts (expandable later):</p>
          <ul className="list-disc ml-6">
            <li>Write a professional CV</li>
            <li>Generate blog post ideas</li>
            <li>Create a daily workout plan</li>
          </ul>
        </div>
      )}

      {tab === "marketing" && (
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="font-bold mb-2">Marketing Toolkit</h2>
          <p>Example calculators (expandable later):</p>
          <ul className="list-disc ml-6">
            <li>ROI Calculator</li>
            <li>Affiliate Commission Tracker</li>
            <li>Ad Spend Estimator</li>
          </ul>
        </div>
      )}

      {tab === "tips" && (
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="font-bold mb-2">Tech Tips Randomizer</h2>
          <p>Tip of the moment:</p>
          <p className="italic">Always use a password manager to secure your logins.</p>
        </div>
      )}
    </div>
  );
}

export default App;
