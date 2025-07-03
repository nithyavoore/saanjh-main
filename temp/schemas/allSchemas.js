const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
  userId: {
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

let userIdSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  userId: {
    type: String,
    required: true,
    unique: true
  }
});

let userIdModel = mongoose.model('UserId', userIdSchema);

let reportSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  week: { type: Number, required: true, min: 1, max: 52 },
  reportData: {
    patientName: { type: String, required: true },
    sex: { type: String, required: true },
    age: { type: String, required: true },
    weight: { type: String, required: true },
    testType: { type: String, required: true },
    testResults: {
      haemoglobin: { type: String, required: true },
      rbcCount: { type: String, required: true },
      pcv: { type: String, required: true },
      rbcIndices: {
        mcv: { type: String, required: true },
        mch: { type: String, required: false },
        mchc: { type: String, required: true },
        rdw: { type: String, required: false }
      },
      totalWBCCount: {
        totalWBCCount: { type: String, required: true },
        differentialCount: { type: mongoose.Schema.Types.Mixed, required: false },
        absoluteLeucocyteCount: { type: mongoose.Schema.Types.Mixed, required: false }
      },
      platelets: {
        plateletCount: { type: String, required: true },
        plateletsOnSmear: { type: String, required: true }
      },
      peripheralBloodSmear: {
        rbc: { type: String, required: true },
        wbc: { type: String, required: true },
        platelets: { type: String, required: true }
      }
    },
    additionalInformation: {
      symptoms: { type: String, required: false },
      currentMedicationUsage: { type: String, required: false },
      extraInformation: { type: String, required: false }
    }
  }
});

let reportsModel = mongoose.model('Report', reportSchema);

module.exports = {
  usersModel,
  userIdModel,
  reportsModel
};
