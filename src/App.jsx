import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { affiliateLinks } from "./data/links";

// Import calculators
import LoanCalculator from "./components/LoanCalculator";
import SavingsCalculator from "./components/SavingsCalculator";
import BMICalculator from "./components/BMICalculator";
import CurrencyConverter from "./components/CurrencyConverter";
import AgeCalculator from "./components/AgeCalculator";
import DiscountCalculator from "./components/DiscountCalculator";

// Import icons from lucide-react
import {
  Calculator,
  PiggyBank,
  HeartPulse,
  DollarSign,
  Calendar,
  Percent,
  Briefcase,
} from "lucide-react";

// Reusable Card component
function Card({ title, icon: Icon, children }) {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition flex flex-col">
      <div className="flex items-center gap-2 mb-3">
        {Icon && <Icon className="text-blue-600 w-6 h-6" />}
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
      </div>
      <div className="flex-grow">{children}</div>
    </div>
  );
}

// Affiliate Toolbox Page
function AffiliateToolbox() {
  const [clicks, setClicks] = useState({});

  useEffect(() => {
    const stored = localStorage.getItem("affiliateClicks");
    if (stored) setClicks(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("affiliateClicks", JSON.stringify(clicks));
  }, [clicks]);

  const handleClick = (name) => {
    setClicks((prev) => ({
      ...prev,
      [name]: (prev[name] || 0) + 1,
    }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {affiliateLinks.map((link, idx) => (
        <Card key={idx} title={link.name} icon={Briefcase}>
          <p className="text-gray-600 mb-3">{link.description}</p>
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleClick(link.name)}
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Visit {link.name}
          </a>
          <p className="text-sm text-gray-500 mt-2">
            Clicks: {clicks[link.name] || 0}
          </p>
        </Card>
      ))}
    </div>
  );
}

// Home Page with Dashboard
function Home() {
  const tools = [
    {
      title: "Affiliate Toolbox",
      path: "/affiliate-toolbox",
      icon: Briefcase,
      description: "Discover powerful affiliate resources and tools.",
    },
    {
      title: "Loan Calculator",
      path: "/loan",
      icon: Calculator,
      description: "Estimate your loan payments easily.",
    },
    {
      title: "Savings Calculator",
      path: "/savings",
      icon: PiggyBank,
      description: "See how your savings grow with interest.",
    },
    {
      title: "BMI Calculator",
      path: "/bmi",
      icon: HeartPulse,
      description: "Calculate your Body Mass Index.",
    },
    {
      title: "Currency Converter",
      path: "/currency",
      icon: DollarSign,
      description: "Convert currencies quickly and easily.",
    },
    {
      title: "Age Calculator",
      path: "/age",
      icon: Calendar,
      description: "Find out your exact age in years, months, and days.",
    },
    {
      title: "Discount Calculator",
      path: "/discount",
      icon: Percent,
      description: "Calculate discounts and final prices.",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tools.map((tool, idx) => (
        <Card key={idx} title={tool.title} icon={tool.icon}>
          <p className="text-gray-600 mb-3">{tool.description}</p>
          <Link to={tool.path} className="text-blue-600 hover:underline">
            Open →
          </Link>
        </Card>
      ))}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 p-6">
        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            FreeTechyIdeas Toolbox
          </h1>
          <p className="text-gray-600">
            Explore calculators, tools, and affiliate resources to grow online.
          </p>
        </header>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/affiliate-toolbox" element={<AffiliateToolbox />} />
          <Route path="/loan" element={<LoanCalculator />} />
          <Route path="/savings" element={<SavingsCalculator />} />
          <Route path="/bmi" element={<BMICalculator />} />
          <Route path="/currency" element={<CurrencyConverter />} />
          <Route path="/age" element={<AgeCalculator />} />
          <Route path="/discount" element={<DiscountCalculator />} />
        </Routes>
      </div>
    </Router>
  );
}
