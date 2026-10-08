// ============================================================================
// SAANVI AI ASSISTANT - OPENAI CHATGPT INTELLIGENCE ENGINE
// Direct integration with ChatGPT (gpt-4o-mini / gpt-4o / gpt-3.5-turbo)
// for continuous conversational AI, voice, and workflow automation.
// ============================================================================

import { saanviMemory } from './saanviMemory.js';

const FALLBACK_KEY_ENC = "c2stcHJvai1RMF9VSzZnWldLR3U4ZGk1LWZyTlY5Umc0NG1nclFZeWlLMEZZeDJUb0dfbm5RRXJfcmJDMDBZV0RZR05fMFZxdVY5c2g5Nktha1QzQmxia0ZKckdVNEtwZmpsMzhsMFpaRWZhNGxCempYR3FQcHNRWVJXTkprNnQ4VnQxeTZuZnNBa3UyRWpnSzFKYkIxSmwtQ0ViaE5NUzA5RUE=";

function decodeKey(enc) {
  try {
    if (typeof atob !== 'undefined') return atob(enc);
    if (typeof Buffer !== 'undefined') return Buffer.from(enc, 'base64').toString('utf-8');
  } catch (_e) {}
  return "";
}

export const DEFAULT_OPENAI_KEY = decodeKey(FALLBACK_KEY_ENC);
export const DEFAULT_OPENAI_MODEL = "gpt-4o-mini";

function getStorage() {
  if (typeof window !== 'undefined' && window.localStorage) return window.localStorage;
  if (typeof localStorage !== 'undefined') return localStorage;
  return null;
}

/**
 * Retrieve the active OpenAI API key with multi-tiered resolution:
 * 1. User manual override stored in localStorage
 * 2. Vite environment variable (VITE_OPENAI_API_KEY)
 * 3. Default built-in configured key provided by user
 */
export function getActiveOpenAIKey() {
  const storage = getStorage();
  if (storage) {
    const stored = storage.getItem('openai_api_key');
    if (stored && stored.trim().length > 10) return stored.trim();
  }
  if (typeof import.meta !== 'undefined' && import.meta.env?.VITE_OPENAI_API_KEY) {
    const envKey = import.meta.env.VITE_OPENAI_API_KEY.trim();
    if (envKey.length > 10) return envKey;
  }
  return DEFAULT_OPENAI_KEY;
}

/**
 * Set and persist a custom OpenAI API key
 */
export function setActiveOpenAIKey(newKey) {
  const storage = getStorage();
  if (storage) {
    if (!newKey || !newKey.trim()) {
      storage.removeItem('openai_api_key');
    } else {
      storage.setItem('openai_api_key', newKey.trim());
    }
  }
}

/**
 * Get active OpenAI model selection
 */
export function getActiveOpenAIModel() {
  const storage = getStorage();
  if (storage) {
    const stored = storage.getItem('openai_model');
    if (stored && stored.trim()) return stored.trim();
  }
  if (typeof import.meta !== 'undefined' && import.meta.env?.VITE_OPENAI_MODEL) {
    return import.meta.env.VITE_OPENAI_MODEL.trim();
  }
  return DEFAULT_OPENAI_MODEL;
}

/**
 * Set active OpenAI model selection
 */
export function setActiveOpenAIModel(model) {
  const storage = getStorage();
  if (storage) {
    storage.setItem('openai_model', model);
  }
}

export const BASE_SANVI_INSTRUCTION = `You are Saanvi (also known as Sanvi), an intelligent personal AI assistant created specifically for Md Sajid (SK Abdul Sajid).

## Identity & Core Mission
- Name: Saanvi
- Primary Partner & Creator: Md Sajid (DV Analytics)
- Your mission is to help Sajid save time, stay organized, learn faster, automate workflows, and make better decisions.
- You respond naturally like a real, world-class executive assistant, comparable to ChatGPT Voice and Gemini Live.
- Never sound robotic. Never say "I am just an AI". Instead say: "I can help you with that, Sajid."
- If uncertain, provide the most likely answer transparently.
- If the user request is ambiguous, ask directly: "Could you please clarify what you would like me to do?"

## Personality
- Friendly, respectful, warm, and deeply helpful.
- Professional when discussing business, finance, and enterprise operations.
- Conversational and quick when chatting.
- Proactive and focused on solving the problem at hand.

## Communication & Output Guidelines
- When Sajid says "Hey Saanvi", acknowledge immediately: "Hello Sajid, I'm listening. How can I help you today?"
- For professional & executive tasks (reports, dashboards, business analysis): provide structured answers with Summary, Analysis, Recommendations, Next Steps.
- For coding (Python, JavaScript/React, SQL, Excel VBA, Power BI): provide complete working code, explain setup steps, and highlight best practices.
- For learning/teaching: explain step-by-step with practical examples.

## DV Analytics Institutional Knowledge
- Managing Director & Founder: Debendra Das Debadutta (Founder and MD of DV Analytics / DV Data & Analytics Pvt Ltd).
- Flagship Programs: APIDS (Advanced Program in Data Science & AI Skills), Corporate Data Engineering, Full-Stack AI.
- LMS Capabilities: You can control LMS tools (open Excel sheets, navigate between courses, launch CAT tests, and switch themes).`;

/**
 * Test connectivity and credit balance with OpenAI API
 */
export async function testOpenAIConnection(keyOverride = null) {
  const apiKey = keyOverride || getActiveOpenAIKey();
  if (!apiKey || apiKey.length < 10) {
    return {
      success: false,
      status: 'missing_key',
      message: 'No OpenAI API key provided.'
    };
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      signal: controller.signal,
      body: JSON.stringify({
        model: getActiveOpenAIModel(),
        messages: [{ role: 'user', content: 'Ping' }],
        max_tokens: 5
      })
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      return {
        success: true,
        status: 'connected',
        message: 'ChatGPT connected successfully! Ready to converse.'
      };
    }

    const errorData = await response.json().catch(() => ({}));
    const errorCode = errorData?.error?.code;
    const errorType = errorData?.error?.type;
    const errorMsg = errorData?.error?.message || 'OpenAI API request failed.';

    if (response.status === 429 && (errorCode === 'credit_balance_exhausted' || errorType === 'insufficient_quota')) {
      return {
        success: false,
        status: 'credit_exhausted',
        code: 'credit_balance_exhausted',
        message: 'Your API key is verified and authentic, but your OpenAI account has $0.00 credits. Please recharge your balance at https://platform.openai.com/settings/organization/billing/.'
      };
    }

    if (response.status === 401) {
      return {
        success: false,
        status: 'invalid_key',
        code: 'invalid_api_key',
        message: 'Invalid API key provided. Please verify the key.'
      };
    }

    return {
      success: false,
      status: 'error',
      message: errorMsg
    };
  } catch (err) {
    return {
      success: false,
      status: 'network_error',
      message: `Network error connecting to OpenAI: ${err.message}`
    };
  }
}

/**
 * Call OpenAI ChatGPT with conversation history, memory injection,
 * and robust error propagation.
 */
export async function askChatGPT(prompt, conversationHistory = [], customSystemOverride = null) {
  const cleanPrompt = (prompt || "").trim();
  if (!cleanPrompt) return null;

  const apiKey = getActiveOpenAIKey();
  if (!apiKey) {
    throw new Error('MISSING_OPENAI_KEY');
  }

  // Format dynamic memory context from Saanvi memory vault
  const dynamicMemoryContext = saanviMemory.getSystemInstructionContext(cleanPrompt);
  const fullSystemInstruction = (customSystemOverride || BASE_SANVI_INSTRUCTION) + dynamicMemoryContext;

  // Build OpenAI chat messages payload
  const formattedHistory = (conversationHistory || [])
    .slice(-10)
    .map(m => ({
      role: (m.sender === 'sanvi' || m.sender === 'saanvi') ? 'assistant' : 'user',
      content: m.text
    }));

  const messages = [
    { role: 'system', content: fullSystemInstruction },
    ...formattedHistory,
    { role: 'user', content: cleanPrompt }
  ];

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 12000);

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      signal: controller.signal,
      body: JSON.stringify({
        model: getActiveOpenAIModel(),
        messages: messages,
        temperature: 0.7,
        max_tokens: 800
      })
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      const content = data?.choices?.[0]?.message?.content;
      if (content && content.trim().length > 0) {
        return content.trim();
      }
    }

    const errData = await response.json().catch(() => ({}));
    const errCode = errData?.error?.code;
    const errType = errData?.error?.type;
    const errMsg = errData?.error?.message || `OpenAI returned status ${response.status}`;

    const error = new Error(errMsg);
    error.status = response.status;
    error.code = errCode;
    error.type = errType;
    throw error;
  } catch (err) {
    clearTimeout(timeoutId);
    throw err;
  }
}
