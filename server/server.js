require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const projectRoutes = require("./routes/projects");
const userRoutes = require('./routes/user')
// express app
const app = express();

// middleware
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use("/api/projects", projectRoutes);
app.use("/api/user", userRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    const port = process.env.PORT || 4000;
    app.listen(port, () => {
      console.log("connected to db & listening on port", port);
    });
  })
  .catch((error) => {
    console.log(error);
  });
