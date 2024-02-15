const express = require("express");
const connection = require("./config/database");
const noteRoutes = require("./src/routes/note.routes.js");
const moment = require("moment");
const notesRoutes = require("./src/routes/note.routes");

const app = express();
const PORT = 4000;

// middleware :
app.use(express.json());
app.use((req, res, next) => {
  console.log(`Method : ${req.method} -> Path : ${req.url} -> On:  ${moment().format("hh:mm:ss")}`);
  console.log(req);
  next();
});

// routes
app.get("/", (req, res) => {
  res.send("This is the home page ~");
});
// notes routes :
app.use("/notes", noteRoutes);

// run the server :
app.listen(PORT, async () => {
  try {
    console.log("Server is running on port", PORT);
    await connection;
    console.log("DB is connected!");
  } catch (error) {
    console.log("Error: ", error);
  }
});
