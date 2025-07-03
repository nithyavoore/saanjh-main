const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
  userId:{
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  userType: {
    type: String,
    required: true
  }
});

let usersModel = mongoose.model('User', userSchema);

let patientIdSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  age:{
    type: Number,
    required: true,
  },
  gender:{
    type: String,
    required: true,
  },
  caretakerId:{
    type: String,
    required: true,
  },
 
});

let patientIdModel = mongoose.model('patientId', patientIdSchema);

let reportSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  week: { type: Number, required: true, min: 1, max: 52 },
  patientData:{
    type: Object,
  },
  reportData: {
    type: Object,
  },
  Prediction:{
    type:String,
  },
  DocNote:{
    type: String,
  },
  dietPlan:{
    type: Object,
  },

});

let reportsModel = mongoose.model('Report', reportSchema);

let careIDSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  patientIds: {
    type: [String],
    required: true
  }
});

let careIDsModel = mongoose.model('CareID', careIDSchema);

module.exports = {
  usersModel,
  patientIdModel,
  reportsModel,
  careIDsModel
};
