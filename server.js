const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const colors = require("colors");

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/admin", require("./routes/adminRoutes"));

const port = 8080;

app.listen(port, () => {
  console.log(`Server running on port ${port}`.bgCyan.white);
});
