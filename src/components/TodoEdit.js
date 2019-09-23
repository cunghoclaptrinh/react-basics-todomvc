import React, { Component } from "react";

class TodoEdit extends Component {
  constructor({ todo }) {
    super();

    this.state = {
      value: todo.name
    };

    this.inputRef = React.createRef();
  }

  componentDidMount() {
    this.inputRef.current.focus();
    this.inputRef.current.setSelectionRange(
      this.props.todo.name.length,
      this.props.todo.name.length
    );
  }

  handleKeyPress = evt => evt.key === "Enter" && this.saveChangeAndExit();

  handleKeyUp = evt => evt.key === "Escape" && this.props.onExit();

  saveChangeAndExit = () => {
    let newName = this.state.value.trim();
    if (newName === "") {
      this.props.onDelete(this.props.todo);
    } else if (newName === this.props.todo.name) {
      this.props.onExit();
    } else {
      this.props.onUpdate({
        ...this.props.todo,
        name: newName
      });
    }
  };

  handleMouseOut = () => this.saveChangeAndExit();

  render() {
    return (
      <input
        className="input"
        ref={this.inputRef}
        value={this.state.value}
        onChange={evt => this.setState({ value: evt.target.value })}
        onKeyPress={this.handleKeyPress}
        onKeyUp={this.handleKeyUp}
      />
    );
  }
}

export default TodoEdit;
