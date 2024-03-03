const express = require("express");
require("dotenv").config();
const cors = require("cors");
const dbconn = require("./config/dbconn");
const app = express();
const initRoutes = require("./routes");
app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
initRoutes(app);
dbconn();

const PORT = process.env.PORT || 7777;
app.listen(PORT, () => console.log("::::::SERVER READY " + PORT));
