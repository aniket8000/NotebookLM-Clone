// src/app.js
const express = require("express");
const morgan = require("morgan");
const path = require("path");

const uploadRoutes = require("./routes/upload.routes");
const queryRoutes = require("./routes/query.routes");

const app = express();

// ✅ Allowed origins
const allowedOrigins = [
  "http://localhost:5173",             // Local dev
  "https://notebooklm.netlify.app"     // Production frontend
];

// 🚀 Force CORS headers globally (Render proxy-safe)
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  } else {
    res.header("Access-Control-Allow-Origin", "https://notebooklm.netlify.app");
  }

  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With"
  );
  res.header("Access-Control-Allow-Credentials", "true");

  // Handle preflight OPTIONS quickly
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

// ✅ Logging & parsing
app.use(morgan("dev"));
app.use(express.json({ limit: "10mb" }));

// ✅ Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// ✅ API routes
app.use("/api/upload", uploadRoutes);
app.use("/api/query", queryRoutes);

// ✅ Health check endpoint
app.get("/ping", (_, res) => res.json({ ok: true, time: Date.now() }));

// ✅ Global error handler
app.use((err, req, res, next) => {
  console.error("🔥 Unhandled error:", err);
  res.status(500).json({ error: err.message || "Server error" });
});

module.exports = app;
