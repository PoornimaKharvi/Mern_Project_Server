
const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  mobile: { type: String },
  designation: { type: String },
  gender: { type: String },
  course: { type: String },


});


const User = mongoose.model("USER", userSchema);
module.exports = User;
