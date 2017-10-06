const mongoose = require("mongoose")

const Schema = mongoose.Schema

const ArticleSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    link: {
        type: String,
        required: true,
        unique: true
    },
    excerpt: {
        type: String,
        required: true,
        unique: true
    },
    date: {
        type: Date,
    }
})

const Article = mongoose.model("Article", ArticleSchema)

module.exports = Article