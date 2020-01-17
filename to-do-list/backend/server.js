const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

// Needed to connect mongodb database that was created "Todo".
mongoose.connect("mongodb://127.0.0.1:27017/Todo", { useNewUrlParser: true });
const connection = mongoose.connection;

//Function that console logs that the MONGO db
//connection has been established once the conection is established
connection.once("open", function() {
  console.log("MongoDB database connection established successfully");
});

app.listen(PORT, function() {
  console.log("Server is running on Port:" + PORT);
});
