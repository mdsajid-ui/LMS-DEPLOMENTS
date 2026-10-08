// ============================================================================
// SAANVI AI ASSISTANT - UNIFIED INTELLIGENCE ENGINE (CHATGPT + GEMINI + OFFLINE)
// Multi-modal intelligent assistant engine with seamless ChatGPT integration,
// sliding conversation memory, and zero-silence failover.
// ============================================================================

import { saanviMemory } from './saanviMemory.js';
import { 
  askChatGPT, 
  getActiveOpenAIKey, 
  setActiveOpenAIKey, 
  getActiveOpenAIModel, 
  setActiveOpenAIModel, 
  testOpenAIConnection, 
  DEFAULT_OPENAI_KEY,
  DEFAULT_OPENAI_MODEL,
  BASE_SANVI_INSTRUCTION 
} from './chatgptService.js';

export { 
  getActiveOpenAIKey, 
  setActiveOpenAIKey, 
  getActiveOpenAIModel, 
  setActiveOpenAIModel, 
  testOpenAIConnection, 
  DEFAULT_OPENAI_KEY,
  DEFAULT_OPENAI_MODEL 
};

function getActiveGeminiKey() {
  if (typeof window !== 'undefined') {
    const stored = window.localStorage.getItem('gemini_api_key');
    if (stored && stored.trim().length > 10) return stored.trim();
  }
  if (typeof import.meta !== 'undefined' && import.meta.env?.VITE_GEMINI_API_KEY) {
    return import.meta.env.VITE_GEMINI_API_KEY;
  }
  return "";
}

const GEMINI_MODEL = "gemini-2.5-flash";

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
 * Unified Saanvi intelligence dispatcher:
 * 1. Primary: OpenAI ChatGPT (gpt-4o-mini / gpt-4o with user's API key)
 * 2. Secondary: Google Gemini API (if key available)
 * 3. Fallback: Zero-Silence Local Intelligence & DV Analytics Knowledge Base
 */
export async function askSanviAI(prompt, conversationHistory = [], customSystemOverride = null) {
  const cleanPrompt = (prompt || "").trim();
  if (!cleanPrompt) return null;

  // Track user turn in memory engine
  saanviMemory.recordTurn('user', cleanPrompt);

  let openAiQuotaExhausted = false;

  // 1. ATTEMPT OPENAI CHATGPT
  const openAiKey = getActiveOpenAIKey();
  if (openAiKey) {
    try {
      const gptResponse = await askChatGPT(cleanPrompt, conversationHistory, customSystemOverride);
      if (gptResponse && gptResponse.trim().length > 0) {
        const cleanGpt = gptResponse.trim();
        saanviMemory.recordTurn('saanvi', cleanGpt);
        return cleanGpt;
      }
    } catch (openAiErr) {
      if (
        openAiErr.code === 'credit_balance_exhausted' ||
        openAiErr.type === 'insufficient_quota' ||
        openAiErr.status === 429
      ) {
        openAiQuotaExhausted = true;
        console.warn("[Saanvi Engine] OpenAI key valid, but credit balance is exhausted:", openAiErr.message);
      } else {
        console.warn("[Saanvi Engine] OpenAI request error, falling back:", openAiErr.message);
      }
    }
  }

  // 2. ATTEMPT GEMINI
  const geminiKey = getActiveGeminiKey();
  if (geminiKey) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${geminiKey}`;
      const formattedHistory = (conversationHistory || [])
        .slice(-8)
        .map(m => ({
          role: (m.sender === 'sanvi' || m.sender === 'saanvi') ? 'model' : 'user',
          parts: [{ text: m.text }]
        }));

      const contents = [
        ...formattedHistory,
        { role: "user", parts: [{ text: cleanPrompt }] }
      ];

      const dynamicMemoryContext = saanviMemory.getSystemInstructionContext(cleanPrompt);
      const fullSystemInstruction = (customSystemOverride || BASE_SANVI_INSTRUCTION) + dynamicMemoryContext;

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          system_instruction: { parts: [{ text: fullSystemInstruction }] },
          contents: contents,
          generationConfig: { temperature: 0.65, maxOutputTokens: 800 }
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
    } catch (_geminiErr) {
      // Proceed to local fallback
    }
  }

  // 3. ZERO-SILENCE LOCAL INTELLIGENCE FALLBACK
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

  // If OpenAI quota is exhausted and no local answer matched:
  if (openAiQuotaExhausted) {
    const quotaMsg = `I have successfully connected your ChatGPT API key, Sajid! 

However, OpenAI reports that your account currently has **\$0.00 credit balance** (\`credit_balance_exhausted\`).

To talk with ChatGPT live:
1. Visit [OpenAI Billing](https://platform.openai.com/settings/organization/billing/)
2. Add \$5 or \$10 credits to your balance
3. Then return here and chat freely!

In the meantime, I can still assist you with DV Analytics courses, assignments, LMS actions, and Excel commands.`;
    saanviMemory.recordTurn('saanvi', quotaMsg);
    return quotaMsg;
  }

  // Unclear / Ambiguous fallback (Zero Silence Rule)
  const clarification = "I can help you with that, Sajid. Could you please clarify what you would like me to do?";
  saanviMemory.recordTurn('saanvi', clarification);
  return clarification;
}

// Backwards-compatible export alias for components
export const askSanviGemini = askSanviAI;

/**
 * Generate human-like concise spoken speech so Saanvi speaks fluidly like
 * ChatGPT Voice without reciting code or markdown syntax.
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
