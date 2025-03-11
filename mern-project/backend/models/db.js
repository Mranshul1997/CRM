const mongoose = require("mongoose");
const MONGO_URL = process.env.MONGO_URL;

mongoose
  .connect(process.env.MONGO_URL, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.error("Database connection error:", err));
