// src/app.js
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");

const uploadRoutes = require("./routes/upload.routes");
const queryRoutes = require("./routes/query.routes");

const app = express();

// ✅ Allowed origins (both local + deployed)
const allowedOrigins = [
  "http://localhost:5173",
  "https://notebooklm.netlify.app",
];

// ✅ Correct CORS middleware (Render-safe)
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like Postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);

// ✅ Explicit OPTIONS handler (important for Render)
app.options("*", cors());

// ✅ Logging & JSON
app.use(morgan("dev"));
app.use(express.json({ limit: "10mb" }));

// ✅ Serve static files
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// ✅ API routes
app.use("/api/upload", uploadRoutes);
app.use("/api/query", queryRoutes);

// ✅ Health check
app.get("/ping", (_, res) => res.json({ ok: true, time: Date.now() }));

// ✅ Global error handler
app.use((err, req, res, next) => {
  console.error("🔥 Unhandled error:", err.message);
  res.status(500).json({ error: err.message || "Server error" });
});

module.exports = app;
