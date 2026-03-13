import type { Competitor } from "@/types";

export const competitorCategories = [
  "frontier",
  "coding",
  "search",
  "workflow",
  "cloud",
  "vertical",
] as const;

export const competitors: Competitor[] = [
  {
    id: "openai",
    name: "OpenAI",
    category: "frontier",
    strengthAreas: ["GPT-4", "broad adoption", "Microsoft partnership", "API ecosystem"],
    claudeDifferentiation: ["Constitutional AI", "stronger enterprise governance", "predictable model behavior", "long context"],
    accountRiskLevel: 88,
    detectedFootprint: "ChatGPT Enterprise, Copilot integrations",
  },
  {
    id: "google",
    name: "Google Gemini",
    category: "frontier",
    strengthAreas: ["Gemini", "Search integration", "Google Workspace", "Vertex AI"],
    claudeDifferentiation: ["Safety alignment", "enterprise controls", "governance posture"],
    accountRiskLevel: 82,
    detectedFootprint: "Gemini for Workspace, Vertex AI pilots",
  },
  {
    id: "microsoft",
    name: "Microsoft Copilot",
    category: "workflow",
    strengthAreas: ["M365 bundling", "Teams", "entrenched footprint", "enterprise relationships"],
    claudeDifferentiation: ["No vendor lock-in", "best-of-breed model choice", "governance controls"],
    accountRiskLevel: 85,
    detectedFootprint: "Copilot for Microsoft 365",
  },
  {
    id: "aws",
    name: "AWS Bedrock",
    category: "cloud",
    strengthAreas: ["Infrastructure", "multi-model", "enterprise cloud"],
    claudeDifferentiation: ["Claude-native experience", "Anthropic partnership", "model quality"],
    accountRiskLevel: 70,
    detectedFootprint: "Bedrock, SageMaker",
  },
  {
    id: "mistral",
    name: "Mistral",
    category: "frontier",
    strengthAreas: ["Open weights", "EU presence", "pricing"],
    claudeDifferentiation: ["Enterprise readiness", "safety posture", "US enterprise focus"],
    accountRiskLevel: 60,
  },
];

export function getCompetitorsByAccount(accountId: string): Competitor[] {
  return competitors.map((c) => ({
    ...c,
    accountRiskLevel: c.accountRiskLevel,
  }));
}
