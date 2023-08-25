
const mongoose = require("mongoose");


const userCredential = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  password:{type: String}
});


const Credentials = mongoose.model("CREDENTIALS", userCredential);
module.exports = Credentials;
