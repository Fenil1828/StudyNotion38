const mongoose = require("mongoose");
require("dotenv").config();

exports.dbconnect = () => {
  mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("DB Connection Successfully");
    })
    .catch((error) => {
      console.log(error);
      console.error(error);

      process.exit(1);
    });
};
