const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const cors = require('cors')
const morgan = require('morgan')

const app = express()
app.use(express.json())
app.use('/upload', express.static('upload'))

app.use(cors())
app.use(morgan('dev'))

app.use(require('./routes/booking.route'))

app.use(require('./routes/user.routes'))

const PORT = process.env.PORT || 5000
mongoose
  .connect(process.env.MONGO_DB)
  .then(() => {
    console.log('База подключена')
  })
  .catch((e) => {
    console.log(e.toString())
  })

app.listen(PORT, (err) => {
  if (err) {
    return console.log(err.toString())
  }
  console.log(`Сервер запущен на порту ${PORT}`)
})
