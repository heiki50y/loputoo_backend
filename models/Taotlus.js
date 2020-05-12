const mongoose = require('mongoose');


const TaotlusSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  opilase_nimi: {
    type: String,
    required: true
  },
  eriala: {
    type: String,
    required: true
  },
  oppegrupp: {
    type: String,
  },
  periood: {
    type: String,
    required: true
  },
  maht: {
    type: String,
    required: true
  },
  ulesanded: {
    type: [String],
    required: true
  },
  taotlus: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'company'
  },
  ettevote_email: {
    type: String,
    required: true
  },
  date: {
    type: String,
  },
  created: {
    type: Date,
  }
},
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

// Reverse populate with virtuals
TaotlusSchema.virtual('ettevote', {
    ref: 'company',
    localField: '_id',
    foreignField: 'taotlus',
    justOne: false
});

module.exports = Taotlus = mongoose.model('taotlus', TaotlusSchema);