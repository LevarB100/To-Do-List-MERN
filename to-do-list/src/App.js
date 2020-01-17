import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CreateTodo from "./components/create-todo.component";
import EditTodo from "./components/edit-todo.component";
import TodoList from "./components/todo-List.component";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <a className="navbar-brand" href="#">
              To Do List App
            </a>

            <ul className="navbar-nav mr-auto">
              <li className="navbar-item">
                <Link to="/" className="nav-link">
                  [To do List]
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/create" className="nav-link">
                  [Create To do]
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/edit/:id" className="nav-link">
                  [Edit To do]
                </Link>
              </li>
            </ul>
          </nav>

          <Route path="/" exact component={TodoList} />
          <Route path="/edit/:id" component={EditTodo} />
          <Route path="/create" component={CreateTodo} />
        </div>
      </Router>
    );
  }
}

export default App;
