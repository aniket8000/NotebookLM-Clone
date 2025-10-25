const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");

const uploadRoutes = require("./routes/upload.routes");
const queryRoutes = require("./routes/query.routes");

const app = express();

// ✅ Allowed domain patterns (Netlify + localhost)
const allowedOrigins = [
  /^http:\/\/localhost(:\d+)?$/,            // local dev
  /^https:\/\/notebookllm(-+[\w-]+)?\.netlify\.app$/ // all Netlify deploy URLs
];

// ✅ Enhanced CORS
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // allow Postman / curl
      const isAllowed = allowedOrigins.some((pattern) => pattern.test(origin));
      if (isAllowed) {
        console.log("✅ CORS allowed for:", origin);
        return callback(null, true);
      } else {
        console.warn("🚫 Blocked CORS request from:", origin);
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);

app.options("*", cors());

app.use(morgan("dev"));
app.use(express.json({ limit: "10mb" }));

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use("/api/upload", uploadRoutes);
app.use("/api/query", queryRoutes);

app.get("/ping", (_, res) => res.json({ ok: true, time: Date.now() }));

app.use((err, req, res, next) => {
  console.error("🔥 Unhandled error:", err.message);
  res.status(500).json({ error: err.message || "Server error" });
});

module.exports = app;
