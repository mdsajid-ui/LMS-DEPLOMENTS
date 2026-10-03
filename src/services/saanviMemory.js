// ============================================================================
// SAANVI AI ASSISTANT - LONG-TERM & SHORT-TERM MEMORY ENGINE
// Enterprise-grade persistent memory with deduplication, cryptographic integrity,
// and semantic retrieval for Md Sajid (DV Analytics)
// ============================================================================

import { getSecureItem, setSecureItem } from '../utils/lmsStorage.js';

const MEMORY_STORAGE_KEY = 'saanvi_memory_vault_v1';

// Default foundational memory profile for Md Sajid
const DEFAULT_FOUNDATIONAL_MEMORIES = [
  {
    id: 'mem_user_identity',
    category: 'profile',
    key: 'user_name',
    fact: 'The user is Md Sajid (SK Abdul Sajid).',
    importance: 10,
    timestamp: Date.now()
  },
  {
    id: 'mem_user_organization',
    category: 'profile',
    key: 'organization',
    fact: 'Sajid works at DV Analytics (DV Data & Analytics Pvt Ltd).',
    importance: 10,
    timestamp: Date.now()
  },
  {
    id: 'mem_user_interests',
    category: 'preferences',
    key: 'interests',
    fact: 'Sajid focuses on AI, Automation, Dashboards, Finance, Data Analytics, and Full-Stack Development.',
    importance: 9,
    timestamp: Date.now()
  },
  {
    id: 'mem_comm_preference',
    category: 'preferences',
    key: 'communication_style',
    fact: 'Preferred language is English. Preferred style is professional, direct, concise, and problem-focused.',
    importance: 9,
    timestamp: Date.now()
  },
  {
    id: 'mem_org_leadership',
    category: 'business',
    key: 'leadership',
    fact: 'Debendra Das Debadutta is the founder and Managing Director of DV Analytics.',
    importance: 9,
    timestamp: Date.now()
  },
  {
    id: 'mem_default_batch',
    category: 'lms',
    key: 'flagship_batch',
    fact: 'Current flagship cohort is APIDS Batch 202606.',
    importance: 8,
    timestamp: Date.now()
  }
];

class SaanviMemoryEngine {
  constructor() {
    this.shortTermMemory = []; // Transient active conversation turns
    this.maxShortTermTurns = 12;
    this.longTermVault = this.loadLongTermMemory();
  }

  // Load from cryptographically protected storage
  loadLongTermMemory() {
    try {
      const stored = getSecureItem(MEMORY_STORAGE_KEY, null);
      if (stored && Array.isArray(stored) && stored.length > 0) {
        // Merge with defaults to ensure foundational memories are always intact
        const existingIds = new Set(stored.map(m => m.id));
        const merged = [...stored];
        DEFAULT_FOUNDATIONAL_MEMORIES.forEach(def => {
          if (!existingIds.has(def.id)) {
            merged.push(def);
          }
        });
        return merged;
      }
    } catch (e) {
      console.warn('[Saanvi Memory] Fallback to default memories:', e);
    }
    return [...DEFAULT_FOUNDATIONAL_MEMORIES];
  }

  // Save to cryptographically protected storage
  persistLongTermMemory() {
    try {
      setSecureItem(MEMORY_STORAGE_KEY, this.longTermVault);
    } catch (e) {
      console.error('[Saanvi Memory] Failed to persist memory:', e);
    }
  }

  // Add conversation turn to short-term memory
  recordTurn(sender, text) {
    if (!text || !text.trim()) return;
    this.shortTermMemory.push({
      sender, // 'user' | 'saanvi'
      text: text.trim(),
      timestamp: Date.now()
    });

    // Enforce sliding window
    if (this.shortTermMemory.length > this.maxShortTermTurns) {
      this.shortTermMemory = this.shortTermMemory.slice(-this.maxShortTermTurns);
    }

    // Auto-detect and store explicit memory commands
    if (sender === 'user') {
      this.extractLearningsFromUser(text);
    }
  }

  // Extract implicit or explicit user preferences ("remember that...", "my favorite...")
  extractLearningsFromUser(text) {
    const lower = text.toLowerCase();
    
    // Explicit "remember that" pattern
    const rememberMatch = text.match(/(?:remember that|note that|keep in mind that|don't forget that)\s+(.*)/i);
    if (rememberMatch && rememberMatch[1]) {
      const fact = rememberMatch[1].trim();
      this.addMemory('custom', fact, 8);
      return;
    }

    // Topic preference detection
    if (lower.includes('i prefer ') || lower.includes('my preference is ')) {
      const prefMatch = text.match(/(?:i prefer|my preference is)\s+(.*)/i);
      if (prefMatch && prefMatch[1]) {
        this.addMemory('preferences', `User preference: ${prefMatch[1].trim()}`, 7);
      }
    }
  }

  // Add or update a long-term memory fact with deduplication
  addMemory(category, fact, importance = 5) {
    if (!fact || fact.trim().length < 4) return;
    const cleanFact = fact.trim();

    // Check for duplicate or highly similar memories
    const duplicate = this.longTermVault.find(m => 
      m.fact.toLowerCase() === cleanFact.toLowerCase() ||
      (m.fact.toLowerCase().includes(cleanFact.toLowerCase()) && m.fact.length < cleanFact.length * 1.3)
    );

    if (duplicate) {
      duplicate.timestamp = Date.now();
      duplicate.importance = Math.max(duplicate.importance, importance);
      this.persistLongTermMemory();
      return duplicate;
    }

    const newMem = {
      id: `mem_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      category,
      fact: cleanFact,
      importance,
      timestamp: Date.now()
    };

    this.longTermVault.push(newMem);
    this.persistLongTermMemory();
    return newMem;
  }

  // Semantic keyword-based relevant memory retrieval for prompt injection
  getRelevantMemories(prompt = '') {
    const promptTokens = (prompt || '').toLowerCase().split(/\W+/).filter(w => w.length > 2);
    
    // Score each memory by relevance + importance
    const scored = this.longTermVault.map(mem => {
      let score = mem.importance;
      const memTokens = mem.fact.toLowerCase().split(/\W+/);
      
      // Foundational identity/org memories always receive baseline boost
      if (mem.category === 'profile') score += 5;

      // Matching keyword boost
      promptTokens.forEach(token => {
        if (memTokens.includes(token)) score += 6;
      });

      return { mem, score };
    });

    // Sort descending and take top 6 most relevant facts
    return scored
      .sort((a, b) => b.score - a.score)
      .slice(0, 6)
      .map(item => item.mem.fact);
  }

  // Format memory injection block for Gemini System Instruction
  getSystemInstructionContext(currentPrompt = '') {
    const relevantFacts = this.getRelevantMemories(currentPrompt);
    return `\n\n[SAANVI ACTIVE MEMORY & USER CONTEXT]:\n` + 
      relevantFacts.map(f => `• ${f}`).join('\n') + 
      `\nAlways address Sajid naturally and leverage remembered context seamlessly without explicitly saying "according to my memory".`;
  }

  // Retrieve current short-term conversation turns
  getRecentConversation(limit = 8) {
    return this.shortTermMemory.slice(-limit);
  }

  // Clear transient short-term memory (e.g. user clicks "New Chat")
  clearShortTerm() {
    this.shortTermMemory = [];
  }

  // Remove a specific memory by ID
  removeMemory(id) {
    this.longTermVault = this.longTermVault.filter(m => m.id !== id);
    this.persistLongTermMemory();
  }

  // Reset to foundational defaults
  resetToFoundational() {
    this.longTermVault = [...DEFAULT_FOUNDATIONAL_MEMORIES];
    this.persistLongTermMemory();
  }

  // Export full memory for inspection/debugging
  getAllMemories() {
    return {
      shortTerm: this.shortTermMemory,
      longTerm: this.longTermVault
    };
  }
}

// Global Singleton Instance
export const saanviMemory = new SaanviMemoryEngine();
