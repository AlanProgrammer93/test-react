const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    role: { 
        type: String, 
        default: "user", 
        enum: ["admin", "user"]
    },
});

module.exports = mongoose.model('User', userSchema);