// src/app.js
// Express app setup (routes, middleware)

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");

const uploadRoutes = require("./routes/upload.routes");
const queryRoutes = require("./routes/query.routes");

const app = express();

// ✅ Allowed origins for both local + deployed frontend
const allowedOrigins = [
  "http://localhost:5173",
  "https://notebooklm.netlify.app",
];

// ✅ Robust CORS middleware for Render + Netlify
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. server-to-server, Render internal)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.warn("❌ Blocked by CORS:", origin);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ Logging & JSON parser
app.use(morgan("dev"));
app.use(express.json({ limit: "10mb" }));

// ✅ Serve uploaded PDFs
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// ✅ API routes
app.use("/api/upload", uploadRoutes);
app.use("/api/query", queryRoutes);

// ✅ Health check
app.get("/ping", (_, res) => res.json({ ok: true, time: Date.now() }));

// ✅ Global error handler
app.use((err, req, res, next) => {
  console.error("🔥 Unhandled error:", err);
  res.status(500).json({ error: err.message || "Server error" });
});

module.exports = app;
