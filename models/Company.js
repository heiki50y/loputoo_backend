const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
    praktikakoha_nimi: {
        type: String,
        required: true
    },
    praktikakoha_epost: {
        type: String,
        required: true
    },
    praktikakoha_tel: {
        type: String,
        required: true
    },
    praktikakoha_address: {
        type: String,
        required: true
    },
    juriidiline_address: {
        type: String,
        required: true
    },
    lepingu_solmija: {
        type: String,
        required: true
    },
    allkirjastamis_alus: {
        type: String,
        required: true
    },
    praktikajuhedaja_nimi_amet: {
        type: String,
        required: true
    },
    praktikajuhendaja_tel: {
        type: String,
        required: true
    },
    praktikajuhendaja_epost: {
        type: String,
        required: true
    },
    taotlus: {
        type: mongoose.Schema.ObjectId,
        ref: 'taotlus',
    },
    ulesanded: {
        type: Array
    }
});

module.exports = Company = mongoose.model('company', CompanySchema);