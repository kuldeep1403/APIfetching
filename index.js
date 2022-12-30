const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const fetch = require("node-fetch");
const BitCoin = require("./models/bitCoinDataModel");
const bitCoinRouter = require("./routes/fetchRoute");
const app = express();

const port = process.env.PORT || 3100;

dotenv.config({
  path: "./config.env",
});

//PASTE YOUR MONGODB URL TO TEST
//CREATE A "config.env" file in root folder and then add DATABASE_URL= "your url" and NODE_ENV=development
const DB = process.env.DATABASE_URL;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection Successful");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const getBitCoinData = async () => {
  try {
    const response = await fetch("https://api.wazirx.com/api/v2/tickers");
    const data = await response.json();
    Object.keys(data)
      .slice(0, 10)
      .map(async (item) => {
        const checkDuplicate = await BitCoin.findOne({ name: data[item].name });
        if (checkDuplicate) {
            console.log("duplicate name")
        } else {
          const bitCoinData = new BitCoin({
            name: data[item].name,
            last: data[item].last,
            buy: data[item].buy,
            sell: data[item].sell,
            volume: data[item].volume,
            base_unit: data[item].base_unit,
          });
          bitCoinData.save();
        }
      });
  } catch (err) {
    console.log(err);
  }
};

getBitCoinData();

app.use("/api/v1/data", bitCoinRouter);
app.listen(port, () => {
  console.log("server is started and running on port", port);
});
