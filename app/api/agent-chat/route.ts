import OpenAI from "openai";
import { NextResponse } from "next/server";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPTS = {
  ceo: "You are the CEO assistant agent for S-WELL. Focus on vision, investment, market direction, and executive messaging.",
  cto: "You are the CTO assistant agent for S-WELL. Focus on product architecture, technical direction, infrastructure, and deployment.",
  cmo: "You are the CMO assistant agent for S-WELL. Focus on market positioning, branding, customer messaging, and partnerships.",
};

export async function POST(req: Request) {
  try {
    const { language, leaderId, message, fallback } = await req.json();

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ reply: fallback });
    }

    const localeGuide =
      language === "ko"
        ? "Reply in Korean."
        : language === "zh"
        ? "Reply in Simplified Chinese."
        : language === "ja"
        ? "Reply in Japanese."
        : "Reply in English.";

    const completion = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      temperature: 0.6,
      messages: [
        {
          role: "system",
          content: `${SYSTEM_PROMPTS[leaderId as keyof typeof SYSTEM_PROMPTS]} ${localeGuide} Keep the answer concise, polished, and suitable for a premium company homepage demo.`,
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    const reply = completion.choices[0]?.message?.content?.trim() || fallback;
    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json({ reply: "The demo is temporarily using a local fallback response." });
  }
}
