const mongoose = require('mongoose');
const subjectSchema = new mongoose.Schema({
    subjects: {
      type: [String],
      default: []
    }
  });
  
  const scheduleSchema = new mongoose.Schema({
    schedule: {
      type: Map,
      of: [String],
      default: {}
    }
  });
  
  const attendanceSchema = new mongoose.Schema({
    attendance: {
      type: Map,
      of: new mongoose.Schema({
        type: Map,
        of: String
      }),
      default: {}
    }
  });
  const sesDataSchema = new mongoose.Schema({
    sessId: { type: mongoose.Schema.Types.ObjectId, ref: 'File', default: null },
    subjects: {
        type: Map,
        of: String,
        default: {}
    },
    schedule: {
        type: Map,
        of: [String], 
        default: {}
    },
    attendance: {
      type: Map,
    of: Map,
    default: {},
    },
  });

const sesData = mongoose.model('atd_session_data', sesDataSchema);

module.exports = sesData;
