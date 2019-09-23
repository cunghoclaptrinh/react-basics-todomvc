import React from "react";

import { TodoHighlightContext } from "../context";

export default class Todo extends React.Component {
  static contextType = TodoHighlightContext;

  render() {
    const { todo, onToggle, onEdit, onDelete } = this.props;

    return (
      <div className="todo">
        <input
          type="checkbox"
          className="toggle"
          onClick={() => onToggle(todo)}
        />
        <div
          className={`label ${todo.status}`}
          onDoubleClick={() => onEdit(todo)}
          style={this.context ? { color: "darkred" } : { color: "unset" }}
        >
          {todo.name}
        </div>
        <button className="deleteButton" onClick={() => onDelete(todo)}>
          ×
        </button>
      </div>
    );
  }
}
