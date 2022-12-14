const mongoose = require("mongoose");
const { Schema } = mongoose; 

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  address:{
    type:String,
    requir2ed:true
  }
});


module.exports = mongoose.model("users", userSchema);