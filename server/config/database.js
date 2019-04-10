const mongoose = require("mongoose");

// Configure mongoose's promise to global promise
mongoose.promise = global.Promise;

const url = process.env.MONGO_URL;

mongoose.connect(url, {
  useNewUrlParser: true,
  // useFindAndModify: false,
  useCreateIndex: true
});
mongoose.set("debug", true);

mongoose.connection.once("open", () =>
  console.log(`Connected successfully to server ☁️`)
);
