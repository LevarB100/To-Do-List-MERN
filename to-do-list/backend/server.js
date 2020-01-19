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

//First endpoint! of the route to  "/" AKA "the mainpage".The route has a ".get function" with a request and response parameter on it then.....
todoRoutes.route("/").get(function(req, res) {
  // Next line says Todo db please FIND todos data in your database..... If there is an err then send err if there id todos data please
  // send that in a json format.
  Todo.find(function(err, todos) {
    if (err) {
      console.log(err);
    } else {
      res.json(todos);
    }
  });
});

//Second endpoint! is the route to the particular todo by its id by using "/:id" AKA the route for particular todos by their id.
// This a get requesst because you are requesting information.
todoRoutes.route("/:id").get(function(req, res) {
  //next line we set the i.d variable equal req.params.id cause thats how you grab something in the main body...this time its the "id"
  let id = req.params.id;
  // Next line says Todo db please FIND todos data in your database by specific id..... If there is an err then send err if there is id todos data please
  // send that in a json format.
  Todo.findById(id, function(err, todo) {
    if (err) {
      console.log(err);
    } else {
      res.json(todo);
    }
  });
});

// Third endpoint!! is the route to add todos thus endpoint is "/add". This is not receiving info but addingor posting hence .post
// command/function.
todoRoutes.route("/add").post(function(req, res) {
  //This line says take this new Todo out of the body of the html(req.body) property and make it the "todo"
  let todo = new Todo(req.body);
  //save the "todo" in the database
  todo
    .save()
    // another type of call back function is used ".then(todo =>" this function says once the todo has been saved
    // give a status of 200 and a msg "todo added successfully".
    .then(todo => {
      res.status(200).json({ todo: "todo added successfully" });
    })
    //catch to catch errors and send msg saying "adding new todo failed"
    .catch(err => {
      res.status(400).send("adding new todo failed");
    });
});

todoRoutes.route("/update/:id").post(function(req, res) {});

//Inserting Router and  Attaching the router URL path. Use "app.use"
//because we are using middleware. Base route is "/todos"...all routes
// are connected to this route
app.use("/todos", todoRoutes);

app.listen(PORT, function() {
  console.log("Server is running on Port:" + PORT);
});
