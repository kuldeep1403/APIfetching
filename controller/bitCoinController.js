const BitCoin = require("../models/bitCoinDataModel");

exports.getAllData = async (req, res, next) => {
  const data = await BitCoin.find();
  res.status(200).json({
    status: "success",
    results:data.length,
    data: {
      data,
    },
  });
};
