const {model, Schema} = require('mongoose');
// USER schema and data types
const userSchema = new Schema({
    name: String,
    age: Number,
    bio: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = model("User", userSchema);