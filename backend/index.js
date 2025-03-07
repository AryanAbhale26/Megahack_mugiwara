const express = require("express");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
// const messageRoutes = require("./routes/messageRoutes");
const connectDB = require("./lib/db");
const cookieParser = require("cookie-parser");
const cors = require("cors");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

//Connect to DB BEFORE starting the server
connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Routes
app.use("/api/auth", authRoutes);
// app.use("/api/message", messageRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
