const mongoose = require('mongoose');

const DocumentsSchema = new mongoose.Schema({
    doc: {
        type: String,
        require: true
    },
    docName: {
        type: String,
    },
    docType: {
        type: String,
        enum: ['juhend', 'abimaterjal', 'dokumendid'],
        required: true
    },
    path: {
        type: String,
        required: true
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