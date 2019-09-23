import React, { Component } from "react";

import TodoList from "./components/TodoList";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { TodoHighlightContext } from "./context";

let maxTodoId = 0;

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      editingTodo: null,
      todoHighlighting: false
    };
  }

  toggleTodo = todo => {
    this.setState({
      todos: this.state.todos.map(td =>
        td === todo
          ? { ...td, status: td.status === "pending" ? "done" : "pending" }
          : td
      )
    });
  };

  toggleAll = targetStatus => {
    this.setState({
      todos: this.state.todos.map(td =>
        td.status !== targetStatus ? { ...td, status: targetStatus } : td
      )
    });
  };

  addTodo = todoName => {
    this.setState({
      todos: [
        ...this.state.todos,
        {
          id: ++maxTodoId,
          name: todoName,
          status: "pending"
        }
      ]
    });
  };

  editTodo = todo => {
    this.setState({
      editingTodo: todo
    });
  };

  cancelEdit = () => this.setState({ editingTodo: null });

  updateTodo = todo => {
    this.setState({
      todos: this.state.todos.map(td => (td.id === todo.id ? todo : td)),
      editingTodo: null
    });
  };

  deleteTodo = todo => {
    this.setState({
      todos: this.state.todos.filter(td => td !== todo)
    });
  };

  clearCompleted = () => {
    this.setState({
      todos: this.state.todos.filter(td => td.status === "pending")
    });
  };

  toggleTodoHighlight = () =>
    this.setState({ todoHighlighting: !this.state.todoHighlighting });

  render() {
    const { todos, editingTodo } = this.state;
    return (
      <div>
        <h1 className="title" onDoubleClick={this.toggleTodoHighlight}>
          todos
        </h1>
        <TodoHighlightContext.Provider value={this.state.todoHighlighting}>
          <div className="container">
            <Header
              todoCount={todos.length}
              pendingCount={todos.filter(td => td.status === "pending").length}
              onToggleAll={this.toggleAll}
              onTodoAdd={this.addTodo}
            />
            <TodoList
              todos={todos}
              editingTodo={editingTodo}
              onToggle={this.toggleTodo}
              onEdit={this.editTodo}
              onEditCancel={this.cancelEdit}
              onUpdate={this.updateTodo}
              onDelete={this.deleteTodo}
            />
            <Footer todos={todos} onClear={this.clearCompleted} />
          </div>
        </TodoHighlightContext.Provider>
      </div>
    );
  }
}
