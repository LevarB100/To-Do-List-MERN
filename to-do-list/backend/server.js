const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const todoRoutes = express.Router();
const PORT = 4000;

//Bring in the model created in Schema;
let Todo = require("./todo.model");

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

//First endpoint of the router "/" mainpage.
todoRoutes.route("/").get(function(req, res) {
  Todo.find(function(err, todos) {
    if (err) {
      console.log(err);
    } else {
      res.json(todos);
    }
  });
});

//Inserting Router and  Attaching the router URL path. Use "app.use"
//because we are using middleware. Base route is "/todos"...all routes
// are connected to this route
app.use("/todos", todoRoutes);

app.listen(PORT, function() {
  console.log("Server is running on Port:" + PORT);
});
