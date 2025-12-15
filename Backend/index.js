// Load environment variables from .env file
require("dotenv").config();

// Import required modules
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser"); // ⭐ Needed for JWT HttpOnly cookies

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize PostgreSQL connection
require("./Model/postgressdb");

// Import your existing routes
const organizationroutes = require("./Route/organizationroutes");
const testtakerroute = require('./Route/testtaker');
const demoRoutes = require('./Route/demo');
const submitdemo = require('./Route/demosubmit');

// Import new Auth routes
const authRoutes = require("./Route/authRoutes");

// -------------------- MIDDLEWARES -------------------- //

// Allow frontend to access backend (CORS)
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,  // ⭐ Needed for cookies
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"]
  })
);

// Parse JSON request bodies
app.use(express.json());

// Parse cookies
app.use(cookieParser());

// -------------------- ROUTES -------------------- //

// Authentication routes
app.use("/api/auth", authRoutes);

// Existing routes
app.use("/api/organizations", organizationroutes);
app.use("/api/testtakerdemo", testtakerroute);
app.use("/api/demotest", demoRoutes);
app.use("/api/demo-submit", submitdemo);

// Root endpoint
app.get("/", (req, res) => {
  res.send("🚀 Server Running Successfully");
});

// -------------------- START SERVER -------------------- //
app.listen(PORT, () => {
  console.log(`🚀 Server is running at: http://localhost:${PORT}`);
});
