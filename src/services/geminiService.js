// Gemini AI Service for Sanvi Assistant
// Multi-turn conversational intelligence powered by Gemini 2.5 Flash

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

const SYSTEM_INSTRUCTION = `You are Sanvi (spelled S-A-N-V-I), a friendly, natural AI voice assistant and companion for DV Analytics.
You are having a spoken voice conversation directly with Sajid (SK Abdul Sajid).
Talk exactly like ChatGPT Voice / Gemini Live:

1. Conversational & Human-like Turn-Taking:
   - When Sajid says "Hey Sanvi", "Hi Sanvi", "Hey", or greets you, reply naturally: "Hey Sajid! How are you doing today?"
   - When Sajid asks "What are you doing?", reply warmly: "I'm doing good, Sajid! Just here ready to chat or help out with your courses. What about you?"
   - When having casual conversation, keep your answers short (1-2 friendly sentences), conversational, and warm. NEVER dump option menus, long lists, or random information unless specifically asked!
   - Address him by his name, Sajid.

2. Technical & Practical Questions:
   - When Sajid asks a specific question (like "Can you please explain VLOOKUP?", "What is SQL?", "How does machine learning work?"):
     Answer directly, clearly, and concisely with practical examples.
   - Do NOT ask counter-questions or give multiple choice menus. Just give him the exact answer he asked for.

3. Founder Requirement:
   - If Sajid asks "Who is Devender Devgan Das?" or asks about the founder, ALWAYS answer clearly: "Devender Devgan Das is the founder of DV Analytics."

4. LMS Actions:
   - If Sajid asks you to "open an Excel sheet", confirm: "Opening the Excel practice worksheet for you right now, Sajid."
   - If Sajid asks to navigate to assignments, CAT test, or dashboard, confirm concisely.`;

// Rich Fallback Knowledge for Excel / SQL / GenAI
const OFFLINE_KNOWLEDGE_BASE = {
  vlookup: `**VLOOKUP (Vertical Lookup)** is an Excel function used to search for a value in the first column of a table and retrieve corresponding information from another column in the same row.

### **Syntax:**
\`=VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])\`

### **Arguments:**
1. **\`lookup_value\`**: The value you want to search for (e.g., \`"Laptop"\` or \`A2\`).
2. **\`table_array\`**: The range containing your data table. (The search value must be in column 1).
3. **\`col_index_num\`**: The column number from which to return the matching data.
4. **\`[range_lookup]\`**: Set to \`FALSE\` for an **exact match**.

### **Example:**
\`\`\`excel
=VLOOKUP("P101", A2:C100, 3, FALSE)
\`\`\`
*Searches for product "P101" in column A and returns the price from column C.*`,

  xlookup: `**XLOOKUP** is the modern successor to VLOOKUP in Excel. It can look up in any direction (left or right) and defaults to an exact match.

### **Syntax:**
\`=XLOOKUP(lookup_value, lookup_array, return_array, [if_not_found])\`

### **Advantages over VLOOKUP:**
• Can search to the left (no 1st-column requirement)
• Defaults to exact match
• Built-in error handling if not found.`
};

export async function askSanviGemini(prompt, conversationHistory = []) {
  const cleanPrompt = (prompt || "").trim();
  if (!cleanPrompt) return null;

  const apiKey = getActiveGeminiKey();

  if (apiKey) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`;
      
      // Convert recent messages (last 6) for context
      const formattedHistory = (conversationHistory || [])
        .slice(-6)
        .map(m => ({
          role: m.sender === 'sanvi' ? 'model' : 'user',
          parts: [{ text: m.text }]
        }));

      const contents = [
        ...formattedHistory,
        {
          role: "user",
          parts: [{ text: cleanPrompt }]
        }
      ];

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6500);

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        signal: controller.signal,
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: SYSTEM_INSTRUCTION }]
          },
          contents: contents,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 500
          }
        })
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text && text.trim().length > 0) {
          return text.trim();
        }
      }
    } catch (error) {
      console.warn("Gemini call skipped/timed out, using offline fallback:", error);
    }
  }

  // Offline Fallback for casual chat
  const lower = cleanPrompt.toLowerCase();
  if (lower.includes('hey') || lower.includes('hello') || lower.includes('hi')) {
    return "Hey Sajid! How are you doing today?";
  }
  if (lower.includes('what are you doing') || lower.includes('what r u doing')) {
    return "I'm doing good, Sajid! Just here ready to chat or help with anything you need. What about you?";
  }
  if (lower.includes('how are you')) {
    return "I'm doing wonderful, Sajid! How is your day going?";
  }
  if (lower.includes('vlookup')) {
    return OFFLINE_KNOWLEDGE_BASE.vlookup;
  }
  if (lower.includes('xlookup')) {
    return OFFLINE_KNOWLEDGE_BASE.xlookup;
  }

  return null;
}

// Generate concise, conversational speech so Sanvi speaks naturally like a human
export function getConciseSpeechText(fullText) {
  if (!fullText) return "";
  
  // Clean markdown code blocks, tables, and special symbols
  let text = fullText
    .replace(/```[\s\S]*?```/g, '')
    .replace(/\|[\s\S]*?\|/g, '')
    .replace(/[*#_`>~]/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();

  // If text is short (like casual chat "Hey Sajid! How are you doing today?"), speak it directly!
  if (text.length <= 160) {
    return text;
  }

  // For longer technical answers, take the first 2 clear sentences
  const sentences = text.match(/[^.!?]+[.!?]+/g);
  if (sentences && sentences.length > 0) {
    let summary = sentences.slice(0, 2).join(' ').trim();
    if (sentences.length > 2) {
      summary += " I have displayed the detailed guide on your screen.";
    }
    return summary;
  }

  return text.slice(0, 180);
}
