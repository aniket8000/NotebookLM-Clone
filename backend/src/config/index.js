// src/config/index.js
// Centralized configuration and MongoDB connection

const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// ✅ Load .env only in local/dev mode
if (process.env.NODE_ENV !== 'production') {
  const envPath = path.resolve(__dirname, '../../.env');
  console.log('🧩 Loading local .env from:', envPath);
  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
  } else {
    console.warn('⚠️ Local .env not found, using system environment variables');
  }
} else {
  console.log('🚀 Running in production — using Render environment variables');
}

// ✅ Debug check (optional)
console.log('🔑 GEMINI_API_KEY loaded:', process.env.GEMINI_API_KEY ? '✅' : '❌');
console.log('🧠 Loaded keys:', Object.keys(process.env).filter(k => k.includes('GEMINI') || k.includes('MONGO')));

const config = {
  port: Number(process.env.PORT || 4000),
  mongodbUri: process.env.MONGODB_URI || '',
  geminiApiKey: process.env.GEMINI_API_KEY || '',
  geminiModel: process.env.GEMINI_CHAT_MODEL || 'models/gemini-2.5-flash',
  maxFileSizeMB: Number(process.env.MAX_FILE_SIZE_MB || 100),
  chunkTokenSize: Number(process.env.CHUNK_TOKEN_SIZE || 700),
  topK: Number(process.env.TOP_K || 5),
};

/**
 * Connect to MongoDB
 */
async function connectDb() {
  if (!config.mongodbUri) {
    throw new Error('MONGODB_URI not set in environment');
  }

  await mongoose.connect(config.mongodbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log('✅ MongoDB connected');
}

module.exports = { config, connectDb };
