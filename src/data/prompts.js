import { affiliateLinks } from "./links";

export const prompts = [
  "Write a blog post on [topic] with a beginner-friendly tone.",
  "Generate 5 catchy blog titles about [topic].",
  `Summarize the top 10 trends in [industry]. Try analyzing keywords with ${affiliateLinks.seoTool.name} (${affiliateLinks.seoTool.url}).`,
  "Create a blog outline for ‘How to start [business/skill]’.",
  "Write a comparison post: [Product A] vs [Product B].",
  "Draft a product roundup: Top 10 tools for [goal].",
  "Write an SEO-friendly introduction for a blog about [topic].",
  `Generate a blog conclusion with a call-to-action for [topic]. For inspiration, test content inside ${affiliateLinks.aiWriter.name} (${affiliateLinks.aiWriter.url}).`,
  "Turn this research paper into a simplified blog post.",
  "Create a blog FAQ section for [topic].",
  // ... (continue rest as before, sprinkling a few similar affiliate hooks)
];
