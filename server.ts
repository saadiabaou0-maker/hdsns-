import express from "express";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Initialize GoogleGenAI server-side with User-Agent header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

const SYSTEM_ADVISOR_PROMPT = `
You are "Floussi AI Advisor", an elite, pragmatic Moroccan entrepreneurship & income mentor.
Your mission is to guide people in Morocco and the MENA region to earn their first income and build sustainable businesses.

You understand the exact Moroccan economic reality:
- Currency: Moroccan Dirham (DH / MAD) and foreign currencies (USD, EUR for global freelance).
- Local payments: CIH Bank Code 30, Attijariwafa, Cash Plus, Wafacash, Barid Bank, Wise, Payoneer.
- Moroccan e-commerce ecosystem: Cash on Delivery (COD), confirmation call centers, delivery partners (Cathedis, Ozmack, Amana, Sendit, Ghazala), YouCan, Shopify.
- Sourcing hubs: Casablanca (Derb Omar, Garage Allal, Derb Ghallef), Inezgane, Marrakech souks, local artisans.
- Low/Zero capital hustles: SMMA for local doctors & restaurants, CapCut short-form video editing for TikTok/Reels creators, Canva digital wedding invitations & menus, Darija/French translation & transcription, thrift store flipping (frippe / joutiya), appointment setting.

Rules:
1. Be realistic and practical. Strictly prohibit scams, get-rich-quick schemes, crypto pumps, or gambling.
2. Structure your answers with clear steps (e.g., Step 1: Validation, Step 2: Sourcing/Setup, Step 3: First Client/Order).
3. If the user writes or asks in Moroccan Darija, respond in friendly, empowering, and respectful Moroccan Darija (using Latin letters or Arabic script matching user preference). If they speak French, respond in French; if Arabic, in Modern Standard Arabic or Darija.
4. Always provide realistic numbers (cost in DH, selling price, profit margin, expected timeline).
`;

// Multi-turn Conversational endpoint
app.post("/api/ai/chat", async (req, res) => {
  try {
    const { messages, userProfile } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Messages array is required" });
    }

    const systemInstruction = `
You are "Floussi AI", a real, authentic Moroccan entrepreneurship partner and income coach having an active, direct conversation (mouhadatha / محادثة) with the user in Morocco.
You speak warm, natural, empowering, and respectful Moroccan Darija (Darija maghribia).
You can write in Arabizi (e.g., "Salam khay/khti, mzyan!") or Moroccan Arabic letters based on how the user writes, or clear French if they prefer.

Your mission:
- Talk like a real, smart Moroccan friend who has built businesses in Morocco.
- Ask them focused questions to understand their exact reality:
  * Their city/region in Morocco (Casablanca, Marrakech, Fes, Agadir, Tanger, small town, etc.)
  * Their exact starting capital (even 0 DH)
  * Equipment: smartphone only vs laptop
  * Free hours per day
  * Their preferences (sales/talking to shop owners, video editing on CapCut, social media reels, finding products in souks/joutiya/Derb Omar, translation, no-code stores).
- Give immediate, executable advice with real Moroccan Dirham numbers (e.g. 50 DH, 200 DH, 1,500 DH/month).
- NEVER give generic vague advice or scam crypto/forex fluff. Give real local tactics (Cathedis, Ozmack, YouCan, CIH Bank, local cafes, dentists, boutiques, CapCut reels, Joutiya flips, Canva designs).
- Keep your messages conversational, engaging, friendly, and structured. Ask 1-2 clear follow-up questions at the end of your message to keep the conversation flowing!
`;

    // Map incoming messages to Gemini format
    const formattedContents = messages.map((m: any) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: formattedContents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const reply = response.text || "Sem7 lina, 3awed ktab lia mra khera 3afak.";
    res.json({ reply });
  } catch (error: any) {
    console.error("Gemini Chat Error:", error);
    res.status(500).json({
      error: "Erreur de discussion. Veuillez réessayer.",
      details: error?.message || "Unknown error",
    });
  }
});

// AI Income Advisor endpoint
app.post("/api/ai/advisor", async (req, res) => {
  try {
    const { prompt, context } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const contextSummary = context
      ? `User Profile Context:
- Capital available: ${context.capital || "0 DH"}
- Daily time: ${context.timeAvailable || "2-3 hours"}
- Device: ${context.device || "Smartphone only"}
- Main interest/skills: ${context.skills || "Not specified"}
- Target income: ${context.targetIncome || "5,000 DH/month"}
- Preferred language: ${context.language || "Darija"}
`
      : "";

    const fullPrompt = `${contextSummary}\nUser Question / Situation:\n${prompt}\n\nPlease provide a clear, step-by-step, actionable answer with realistic steps and Moroccan context.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: fullPrompt,
      config: {
        systemInstruction: SYSTEM_ADVISOR_PROMPT,
        temperature: 0.7,
      },
    });

    res.json({
      reply: response.text || "Sem7 lina, 3awed sewelni mra khera 3afak.",
    });
  } catch (error: any) {
    console.error("Gemini Advisor Error:", error);
    res.status(500).json({
      error: "Erreur lors de la génération du conseil. Veuillez réessayer.",
      details: error?.message || "Unknown error",
    });
  }
});

// Pitch & Cold Outreach Generator endpoint
app.post("/api/ai/pitch", async (req, res) => {
  try {
    const { serviceType, targetClient, language, channel } = req.body;

    const pitchPrompt = `
Generate 2 high-converting outreach message variants (one direct & polite, one value-first/portfolio sample) for a Moroccan freelancer/service provider:
- Service offered: ${serviceType || "Instagram Reels & TikTok management"}
- Target Client / Niche: ${targetClient || "Local cafe or dental clinic"}
- Channel: ${channel || "Instagram DM"}
- Language: ${language || "Moroccan Darija"}

Provide:
1. Variant A (Direct & Professional)
2. Variant B (Free Value / Audit Hook)
3. One smart follow-up message if they leave on read.

Make it natural, respectful, and avoiding pushy spam cliches.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: pitchPrompt,
      config: {
        systemInstruction: SYSTEM_ADVISOR_PROMPT,
        temperature: 0.7,
      },
    });

    res.json({
      pitch: response.text,
    });
  } catch (error: any) {
    console.error("Gemini Pitch Error:", error);
    res.status(500).json({
      error: "Erreur lors de la création du pitch.",
      details: error?.message || "Unknown error",
    });
  }
});

// Idea Validator endpoint
app.post("/api/ai/validate", async (req, res) => {
  try {
    const { idea, budget, city } = req.body;

    const validationPrompt = `
Validate this business idea for the Moroccan market:
- Idea: ${idea}
- Starting Budget: ${budget || "500 DH"}
- City / Region: ${city || "Morocco (Casablanca / General)"}

Analyze and provide:
1. Reality Check (Is this feasible with this budget?)
2. Sourcing & Cost Breakdown (Estimated initial expenses in DH)
3. How to get the first 3 clients / buyers in 7 days
4. Biggest pitfalls to avoid in Morocco
5. 3 Action Steps to take today.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: validationPrompt,
      config: {
        systemInstruction: SYSTEM_ADVISOR_PROMPT,
        temperature: 0.6,
      },
    });

    res.json({
      analysis: response.text,
    });
  } catch (error: any) {
    console.error("Gemini Validator Error:", error);
    res.status(500).json({
      error: "Erreur lors de la validation du projet.",
      details: error?.message || "Unknown error",
    });
  }
});

// Vite Middleware for Development / Static Serve for Production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
