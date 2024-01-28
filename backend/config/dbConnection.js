const mongoose = require("mongoose");

const connection = async () => {
  await mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Databse connected");
    })
    .catch((err) => {
      console.log(`Database connection errror : ${err.message}`);
    });
};

module.exports = connection;
