// src/services/llm.service.js
// Gemini 2.5 Integration — properly loads .env before use

const path = require('path');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { estimateTokens } = require('../utils/tokenizer');

// ✅ Force dotenv to load .env from backend root
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// ✅ Verify that key exists
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const MODEL_NAME = process.env.GEMINI_CHAT_MODEL || 'models/gemini-2.5-flash';

if (!GEMINI_API_KEY) {
  console.error('❌ GEMINI_API_KEY missing in .env or loaded too late');
  console.error('📁 Expected .env path:', path.resolve(__dirname, '../../.env'));
  throw new Error('GEMINI_API_KEY missing in .env');
}

console.log('✅ GEMINI_API_KEY loaded successfully');
console.log('🧠 Using Gemini model:', MODEL_NAME);

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

/**
 * answerWithCitations(question, topChunks)
 * Generates an answer referencing PDF text snippets and citing pages.
 */
async function answerWithCitations(question, topChunks = [], opts = {}) {
  if (!question) throw new Error('Missing question');

  const llm = genAI.getGenerativeModel({ model: MODEL_NAME });

  const tokenBudget = opts.tokenBudget || 1200;
  let used = 0;
  const ctxParts = [];
  const sources = [];

  for (const { chunk } of topChunks) {
    const snippet = chunk.text.slice(0, 1000);
    const tokens = estimateTokens(snippet);
    if (used + tokens > tokenBudget) break;
    used += tokens;
    ctxParts.push(`(Page ${chunk.page}) ${snippet}`);
    sources.push({ page: chunk.page });
  }

  const context = ctxParts.join('\n\n');

  const prompt = `
You are a helpful assistant that answers questions strictly based on the provided text.
Provide clear, factual, and concise answers (maximum 5 sentences).
Do not include page numbers, citations, or any reference markers in your response.

Context:
${context}

Question:
${question}
`;

  try {
    const result = await llm.generateContent(prompt);
    const answer = result.response.text();
    return { answer, sources };
  } catch (err) {
    console.error('❌ Gemini query failed:', err);
    throw new Error(`Gemini query failed: ${err.message}`);
  }
}

module.exports = { answerWithCitations };
