const mongoose = require("mongoose");

const bitCoinSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  last: Number,
  buy: Number,
  sell: Number,
  volume: Number,
  base_unit: String,
});

const BitCoin = mongoose.model("BitCoin", bitCoinSchema);
module.exports = BitCoin;
