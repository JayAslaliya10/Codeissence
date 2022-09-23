const mongoose = require("mongoose");
const { Schema } = mongoose; 

const descSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
    unique: true,
  }
});


module.exports = mongoose.model("emergencyDesc", descSchema);