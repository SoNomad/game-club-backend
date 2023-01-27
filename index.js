const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const morgan = require("morgan");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

const PORT = process.env.PORT || 5000;

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_DB)
  .then(() => {
    console.log('База подключена')
  })
  .catch((e) => {
    console.log(e.toString())
  })

app.use(require("./routes/seat.routes"));
app.use(require("./routes/booking.routes"));

app.listen(PORT, (err) => {
  if (err) {
    return console.log(err.toString())
  }
  console.log(`Сервер запущен на порту ${PORT}`)
})
