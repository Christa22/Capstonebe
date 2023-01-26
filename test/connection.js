const mongoose  = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema and Model

const MochaCharSchema = new Schema({
    name : String,
    weight: Number
});
 const MochaChar = mongoose.model("MochaChar",MochaCharSchema);
  module.exports = MochaChar;
    

