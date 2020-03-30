const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
    ettevote_nimi: {
        type: String
    },
    telefon: {
        type: String
    },
    aadress: {
        type: String
    },
    lepingu_solmija: {
        type: String
    },
    lepingu_alus: {
        type: String
    },
    juhendaja: {
        type: String
    },
    juhendaja_telefon: {
        type: String
    },
    taotlus: {
        type: mongoose.Schema.ObjectId,
        ref: 'taotlus',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Company = mongoose.model('company', CompanySchema);