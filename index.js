#!/usr/bin/env node

import fs from "fs";
import readline from "readline";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

// Check API key
if (!process.env.OPENAI_API_KEY) {
  console.error("❌ Missing OPENAI_API_KEY in .env");
  process.exit(1);
}

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

// Read input
async function getInput() {
  const filePath = process.argv[2];

  if (filePath) {
    try {
      return fs.readFileSync(filePath, "utf-8").trim();
    } catch (err) {
      console.error("❌ File error:", err.message);
      process.exit(1);
    }
  }

  console.log("📥 Paste text (Ctrl+D to submit):");

  const rl = readline.createInterface({
    input: process.stdin,
    terminal: false,
  });

  let text = "";
  for await (const line of rl) {
    text += line + "\n";
  }

  return text.trim();
}

// Call LLM
async function summarize(text) {
  if (!text) {
    console.error("❌ Empty input");
    process.exit(1);
  }

  try {
    const res = await client.chat.completions.create({
      model: "openai/gpt-3.5-turbo",
      temperature: 0.3,
      messages: [
        {
          role: "system",
          content:
            "You extract structured summaries and ALWAYS return valid JSON.",
        },
        {
          role: "user",
          content: `
Return ONLY valid JSON.

STRICT REQUIREMENTS:
- summary: exactly one sentence
- key_points: EXACTLY 3 bullet points (no more, no less)
- sentiment: one of "positive", "neutral", "negative"

Format:
{
  "summary": "...",
  "key_points": ["...", "...", "..."],
  "sentiment": "..."
}

Text:
${text}
`,
        },
      ],
    });

    const output = res.choices[0].message.content;

    try {
      const result = JSON.parse(output);

  if (!result.key_points || result.key_points.length !== 3) {
    result.key_points = (result.key_points || []).slice(0, 3);
    while (result.key_points.length < 3) {
      result.key_points.push("Additional inferred point");
    }
  }

  return result;
    } catch {
      console.error("❌ Invalid JSON from model:\n", output);
      process.exit(1);
    }
  } catch (err) {
    console.error("❌ API Error:", err.message);
    process.exit(1);
  }
}

// Print result
function print(result) {
  console.log("\n========================");
  console.log("📌 SUMMARY");
  console.log("========================");
  console.log(result.summary);

  console.log("\n🔑 KEY POINTS");
  console.log("========================");
  result.key_points.forEach((p, i) => {
    console.log(`${i + 1}. ${p}`);
  });

  console.log("\n💬 SENTIMENT");
  console.log("========================");
  console.log(result.sentiment.toUpperCase());
}

// Run
(async () => {
  const input = await getInput();
  const result = await summarize(input);
  print(result);
})();