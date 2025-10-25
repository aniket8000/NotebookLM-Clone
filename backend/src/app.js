// src/app.js
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");

const uploadRoutes = require("./routes/upload.routes");
const queryRoutes = require("./routes/query.routes");

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://notebooklm.netlify.app",
];

// ✅ CORS middleware
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With"
  );
  res.header("Access-Control-Allow-Credentials", "true");

  // ✅ Handle preflight requests fast
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(morgan("dev"));
app.use(express.json({ limit: "10mb" }));

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use("/api/upload", uploadRoutes);
app.use("/api/query", queryRoutes);

app.get("/ping", (_, res) => res.json({ ok: true, time: Date.now() }));

app.use((err, req, res, next) => {
  console.error("🔥 Unhandled error:", err);
  res.status(500).json({ error: err.message || "Server error" });
});

module.exports = app;
