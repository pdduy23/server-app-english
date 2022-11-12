const mongoose = require('mongoose')
const Schema = mongoose.Schema

const VocabSchema = new Schema({
    word: {
        type: String,
        required: true,
    },

    define: {
        type: Array,
        required: true
    },

    count: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('vocabs', VocabSchema)