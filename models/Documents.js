const mongoose = require('mongoose');

const DocumentsSchema = new mongoose.Schema({
    doc: {
        type: String,
    },
    docType: {
        type: String,
        enum: ['juhend', 'abimaterjal'],
        required: true
    },
    path: {
        type: String,
    },
    group: {
        type: String,
        enum: ['vs', 'kd', 'is', 'isp', 'SYSt', 'all'],
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Documents = mongoose.model('documents', DocumentsSchema);