require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./db/connectdb");
const problemRoutes = require("./routes/problems");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/problems", problemRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});