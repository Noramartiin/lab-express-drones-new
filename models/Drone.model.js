const mongoose = require("mongoose");

let DroneSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  propellers: {
    type: Number,
    min: 0,
  },
  maxSpeed: {
    type: Number,
    min: 0,
  },
});

const DroneModel = mongoose.model("myDrone", DroneSchema);
module.exports = DroneModel;
