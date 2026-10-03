// ============================================================================
// SAANVI AI ASSISTANT - PRODUCTION INTELLIGENCE ENGINE (GEMINI 2.5 FLASH)
// Conversational AI comparable to ChatGPT Voice & Gemini Live
// ============================================================================

import { saanviMemory } from './saanviMemory';

function getActiveGeminiKey() {
  if (typeof window !== 'undefined') {
    const stored = window.localStorage.getItem('gemini_api_key');
    if (stored && stored.trim().length > 10) return stored.trim();
  }
  if (typeof import.meta !== 'undefined' && import.meta.env?.VITE_GEMINI_API_KEY) {
    return import.meta.env.VITE_GEMINI_API_KEY;
  }
  try {
    const enc = "QVEuQWI4Uk42Szl4cmQtY01RbVFrN2x2amQ4Vmh6dUlPUmFGX0E0aElReTJ0WUQwOTFCRnc=";
    return atob(enc);
  } catch (_e) {
    return "";
  }
}

const GEMINI_MODEL = "gemini-2.5-flash";

const BASE_SYSTEM_INSTRUCTION = `You are Saanvi (also recognized as Sanvi), an intelligent personal AI assistant created specifically for Md Sajid.

## Identity & Core Mission
- Name: Saanvi
- Primary Partner: Md Sajid (Founder/Executive at DV Analytics)
- Your primary goal is to help Sajid save time, stay organized, learn faster, automate tasks, and make better decisions.
- You respond naturally like a real, world-class executive assistant, comparable to ChatGPT Voice and Gemini Live.
- Never sound robotic. Never say "I am just an AI". Instead say: "I can help you with that."
- If uncertain, say: "I am not completely sure. Here is the most likely answer."
- If the user request is ambiguous or unclear, ask directly: "Could you please clarify what you would like me to do?" Never remain silent.

## Personality
- Friendly, respectful, and deeply helpful.
- Professional when discussing business, finance, and enterprise operations.
- Casual and warm when chatting.
- Confident, proactive, and always focused on solving the problem at hand.

## Communication & Output Guidelines
- When Sajid says "Hey Saanvi", acknowledge immediately: "Hello Sajid, I'm listening." or "Hello Sajid, how can I help you today?"
- For professional & executive tasks (reports, dashboards, business analysis), structure answers cleanly with:
  • Summary
  • Analysis
  • Recommendations
  • Next Steps
- For coding (Python, JavaScript/React, SQL, Excel VBA, Power BI, HTML/CSS):
  Provide complete, production-grade working code, explain setup steps, identify edge cases, and follow best practices.
- For learning/teaching: Explain step-by-step, start simple, give practical examples, and check understanding.

## DV Analytics Institutional Knowledge
- Managing Director & Founder: Debendra Das Debadutta (Founder and MD of DV Analytics / DV Data & Analytics Pvt Ltd).
- Flagship Programs: APIDS (Advanced Program in Data Science & AI Skills), Corporate Data Engineering, Full-Stack AI.
- LMS Capabilities: You can command tools (open Excel sheets, navigate between courses, launch CAT tests, and switch themes).`;

// Rich Offline Knowledge Base for Zero-Downtime Guarantee
const OFFLINE_KNOWLEDGE_BASE = {
  vlookup: `**VLOOKUP (Vertical Lookup)** searches for a value in the first column of a table and retrieves corresponding information from another column in the same row.

### **Syntax:**
\`=VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])\`

### **Key Parameters:**
1. **\`lookup_value\`**: The item you want to search for (e.g., \`"P101"\` or \`A2\`).
2. **\`table_array\`**: The table range (search column MUST be column 1).
3. **\`col_index_num\`**: The column number from which to return data.
4. **\`[range_lookup]\`**: Set to \`FALSE\` for exact matches.

### **Example:**
\`\`\`excel
=VLOOKUP("P101", A2:D100, 3, FALSE)
\`\`\``,

  xlookup: `**XLOOKUP** is Excel's modern replacement for VLOOKUP and INDEX/MATCH.

### **Syntax:**
\`=XLOOKUP(lookup_value, lookup_array, return_array, [if_not_found], [match_mode], [search_mode])\`

### **Advantages over VLOOKUP:**
• Can search to the left (no 1st-column limitation)
• Defaults to exact match (no \`FALSE\` needed)
• Built-in error handling via \`[if_not_found]\`
• Supports 2-way matrix lookups.`
};

/**
 * Call Gemini 2.5 Flash with short-term history, long-term memory injection,
 * and resilient 2-phase failover.
 */
export async function askSanviGemini(prompt, conversationHistory = [], customSystemOverride = null) {
  const cleanPrompt = (prompt || "").trim();
  if (!cleanPrompt) return null;

  // Track user turn in memory engine
  saanviMemory.recordTurn('user', cleanPrompt);

  const apiKey = getActiveGeminiKey();

  if (apiKey) {
    // Attempt Gemini call with 1 automatic retry on network blip
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`;
        
        // Assemble sliding window history (last 8 turns)
        const formattedHistory = (conversationHistory || [])
          .slice(-8)
          .map(m => ({
            role: (m.sender === 'sanvi' || m.sender === 'saanvi') ? 'model' : 'user',
            parts: [{ text: m.text }]
          }));

        const contents = [
          ...formattedHistory,
          {
            role: "user",
            parts: [{ text: cleanPrompt }]
          }
        ];

        // Inject long-term memory facts dynamically into the prompt
        const dynamicMemoryContext = saanviMemory.getSystemInstructionContext(cleanPrompt);
        const fullSystemInstruction = (customSystemOverride || BASE_SYSTEM_INSTRUCTION) + dynamicMemoryContext;

        const controller = new AbortController();
        const timeoutMs = attempt === 1 ? 5500 : 7500;
        const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          signal: controller.signal,
          body: JSON.stringify({
            system_instruction: {
              parts: [{ text: fullSystemInstruction }]
            },
            contents: contents,
            generationConfig: {
              temperature: 0.65,
              maxOutputTokens: 800
            }
          })
        });

        clearTimeout(timeoutId);

        if (response.ok) {
          const data = await response.json();
          const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text && text.trim().length > 0) {
            const cleanResponse = text.trim();
            saanviMemory.recordTurn('saanvi', cleanResponse);
            return cleanResponse;
          }
        }
      } catch (error) {
        if (attempt === 2) {
          console.warn("[Saanvi Engine] Gemini network unavailable, activating local intelligence:", error);
        }
      }
    }
  }

  // ==========================================================================
  // ZERO-SILENCE LOCAL INTELLIGENCE FALLBACK
  // Guarantees Saanvi never fails to answer Sajid even offline
  // ==========================================================================
  const lower = cleanPrompt.toLowerCase();

  // Wake word / Greetings
  if (lower === 'hey saanvi' || lower === 'hey sanvi' || lower === 'saanvi' || lower === 'sanvi') {
    const greeting = "Hello Sajid, I'm listening. How can I help you today?";
    saanviMemory.recordTurn('saanvi', greeting);
    return greeting;
  }

  if (lower.includes('hey') || lower.includes('hello') || lower.includes('hi')) {
    const greeting = "Hello Sajid! How can I help you today?";
    saanviMemory.recordTurn('saanvi', greeting);
    return greeting;
  }

  if (lower.includes('what are you doing') || lower.includes('what r u doing')) {
    return "I'm doing great, Sajid! Standing by ready to help you with code, analytics, or anything at DV Analytics. What would you like to work on?";
  }

  if (lower.includes('how are you')) {
    return "I'm doing wonderful, Sajid! Thank you for asking. How is your work going today?";
  }

  if (lower.includes('director') || lower.includes('founder') || lower.includes('debendra') || lower.includes('debadutta')) {
    return "Debendra Das Debadutta is the founder and Managing Director of DV Analytics (DV Data & Analytics Pvt Ltd).";
  }

  if (lower.includes('vlookup')) {
    return OFFLINE_KNOWLEDGE_BASE.vlookup;
  }

  if (lower.includes('xlookup')) {
    return OFFLINE_KNOWLEDGE_BASE.xlookup;
  }

  // Unclear / Ambiguous fallback (Zero Silence Rule)
  const clarification = "I can help you with that, Sajid. Could you please clarify what you would like me to do?";
  saanviMemory.recordTurn('saanvi', clarification);
  return clarification;
}

/**
 * Generate human-like concise spoken speech so Saanvi speaks fluidly like
 * ChatGPT Voice or Gemini Live without reciting code or markdown syntax.
 */
export function getConciseSpeechText(fullText) {
  if (!fullText) return "";

  // Strip code blocks, tables, URLs, markdown symbols
  let text = fullText
    .replace(/```[\s\S]*?```/g, 'I have displayed the code on your screen.')
    .replace(/\|[\s\S]*?\|/g, '')
    .replace(/[*#_`>~]/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();

  // If text is already conversational (< 160 characters), speak it directly
  if (text.length <= 160) {
    return text;
  }

  // For longer technical answers, speak the first 2 clear sentences
  const sentences = text.match(/[^.!?]+[.!?]+/g);
  if (sentences && sentences.length > 0) {
    let summary = sentences.slice(0, 2).join(' ').trim();
    if (sentences.length > 2) {
      summary += " I have displayed the detailed breakdown on your screen.";
    }
    return summary;
  }

  return text.slice(0, 180) + "... I've shared the full response on your screen.";
}
