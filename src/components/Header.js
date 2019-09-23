import React, { Component } from "react";

class Header extends Component {
  constructor() {
    super();
    this.state = {
      todoName: ""
    };
    this.todoInputRef = React.createRef();
  }

  componentDidMount() {
    this.todoInputRef.current.focus();
  }

  handleTodoNameChange = evt => this.setState({ todoName: evt.target.value });

  handleKeyPress = evt => {
    const todoName = this.state.todoName.trim();
    if (evt.key === "Enter" && todoName) {
      this.props.onTodoAdd(todoName);
      this.setState({ todoName: "" });
    }
  };

  render() {
    const { todoCount, pendingCount, onToggleAll } = this.props;
    const allDone = pendingCount === 0;
    return (
      <header className="header">
        {todoCount > 0 && (
          <span
            className={`toggleAll ${allDone ? "lit" : "dim"}`}
            onClick={() => onToggleAll(allDone ? "pending" : "done")}
          />
        )}
        <input
          className="input"
          placeholder="What needs to be done?"
          value={this.state.todoName}
          onChange={this.handleTodoNameChange}
          onKeyPress={this.handleKeyPress}
          ref={this.todoInputRef}
        />
      </header>
    );
  }
}

export default Header;
