const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
    praktikakoha_nimi: {
        type: String
    },
    praktikakoha_epost: {
        type: String
    },
    praktikakoha_tel: {
        type: String
    },
    praktikakoha_address: {
        type: String
    },
    lepingu_solmija: {
        type: String
    },
    allkirjastamis_alus: {
        type: String
    },
    praktikajuhedaja_nimi_amet: {
        type: String
    },
    praktikajuhendaja_tel: {
        type: String
    },
    praktikajuhendaja_epost: {
        type: String
    },
    taotlus: {
        type: mongoose.Schema.ObjectId,
        ref: 'taotlus',
        required: true
    },
    ulesanded: {
        type: Array
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Company = mongoose.model('company', CompanySchema);