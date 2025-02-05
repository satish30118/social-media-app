const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

// DIFFIRENT ROUTES //
const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
const postRoute = require("./routes/postRoute");

const app = express();
const dotenv = require("dotenv").config(); // DOTENV FILE
const connectDB = require("./database/dbconnect"); // DB CONNECTION

// MIDDLEWARE
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use("/upload", express.static("upload"));

// DATA BASE CONNECTION //
connectDB(); // calling DB Function

// Routes //
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/post", postRoute);


// DEFAULT ROUTE //
app.get("/", (req, res) => {
  res.send("Hello mai yahi hu.");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("Server is running at " + PORT);
});
