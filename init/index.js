const mongoose = require("mongoose");
const initData = require("./data.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const Listing = require("../models/listing.js");

main()
  .then(() => {
    console.log("connect to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDb = async () => {
  await Listing.deleteMany();
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "698f025977d309422d6c699e",
  }));
  await Listing.insertMany(initData.data);
  console.log("Data  was initialized");
};
initDb();
