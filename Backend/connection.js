const mongoose = require("mongoose");

const uri = "mongodb+srv://limithamejo:limitha@cluster0.e4fkt3e.mongodb.net/proj3?retryWrites=true&w=majority";

mongoose
  .connect(uri)
  .then(() => {
    console.log("✅ Connected to MongoDB Atlas");
  })
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  });
