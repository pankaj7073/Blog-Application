const express = require("express");
const connection = require("./config/dbConnection");
require("dotenv").config();
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");
const cookie_parser = require("cookie-parser");
const path = require("path");

// Variable
const app = express();
const port = process.env.PORT;

// Middleware
app.use(express.json());
app.use(cookie_parser());

// Database Connection
connection();

// Routes
app.use("/api/v1/auth/", userRoutes);
app.use("/api/v1/", blogRoutes);


// Static Path
app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});

// Server start after successfull db connection
app.listen(port, () => {
  console.log(`server started at port ${port}`);
});
