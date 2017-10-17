import mongoose from 'mongoose';

const newComment = new mongoose.Schema({
    text: String
}, {
  versionKey : false
})

module.exports = mongoose.model("Comment", newComment, "comments")
