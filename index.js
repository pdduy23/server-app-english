require('dotenv').config()

const { connectDB } = require('./config/db')

connectDB()

const express = require('express')
const cors = require('cors')

const vocabRouter = require('./routes/vocab')

const app = express()
const PORT = process.env.PORT || process.env.APP_PORT

app.use(cors())
app.use(express.json())

app.use('/api', vocabRouter)

app.listen(PORT, () => console.log('Connected: ', PORT))

