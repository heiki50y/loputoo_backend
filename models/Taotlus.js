const mongoose = require('mongoose');

const TaotlusSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  opilase_nimi: {
    type: String
  },
  oppegrupp: {
    type: String
  },
  eriala: {
    type: String
  },
  periood: {
    type: String
  },
  maht: {
    type: String
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
    type: String
  },
  date: {
    type: Date,
    default: Date.now
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