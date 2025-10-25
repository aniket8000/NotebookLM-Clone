// src/app.js
// Express app setup (routes, middleware)

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");

const uploadRoutes = require("./routes/upload.routes");
const queryRoutes = require("./routes/query.routes");

const app = express();

// ✅ Allowed origins (local + production)
const allowedOrigins = [
  "http://localhost:5173",          // local dev
  "https://notebooklm.netlify.app"  // production frontend
];

// ✅ CORS configuration
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.warn("❌ Blocked CORS request from:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

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
  console.error("Unhandled error:", err);
  res.status(500).json({ error: err.message || "Server error" });
});

module.exports = app;
