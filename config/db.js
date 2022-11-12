const mongoose = require('mongoose')

const connectDB = () => {
    const conn = mongoose.connect(process.env.DB_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })

    console.log("DB connected.")

}

module.exports = { connectDB }