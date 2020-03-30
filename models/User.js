const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['student', 'admin'],
        default: 'student'
    },
    group: {
        type: String,
        enum: ['vs', 'kd', 'is', 'isp', 'SYSt'],
        required: true
    },
    taotlus: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'taotlus'
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = User = mongoose.model('user', UserSchema);