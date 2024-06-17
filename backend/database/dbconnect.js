const mongoose = require("mongoose");
const db = process.env.DB;

const connectDB = async () => {
  try {
    if (!db) {
      console.log("No db link available");
    }
    await mongoose.connect(db, {
      family: 4,
      serverSelectionTimeoutMS: 50000, // 5 seconds timeout
    });
    console.log("DATA BASE CONNECTED SUCCESSFULLY!!");
  } catch (error) {
    console.log("ERROR IN DB CONNECT:-  " + error);
  }
};

module.exports = connectDB;
