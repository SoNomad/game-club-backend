const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_DB)
  .then(() => {
    console.log("База подключена");
  })
  .catch((e) => {
    console.log(e.toString());
  });

app.listen(PORT, (err) => {
  if (err) {
    return console.log(err.toString());
  }
  console.log(`Сервер запущен на порту ${PORT}`);
});
