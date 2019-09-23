import React, { Component } from "react";

import Todo from "./Todo";
import TodoEdit from "./TodoEdit";
import withMouseContainer from "./MouseContainer";

const TodoEditContainer = withMouseContainer(TodoEdit);

class TodoList extends Component {
  render() {
    const {
      todos,
      onToggle,
      onEdit,
      editingTodo,
      onEditCancel,
      onUpdate,
      onDelete
    } = this.props;
    return (
      <div>
        {todos.map(todo =>
          todo === editingTodo ? (
            <TodoEditContainer
              key={todo.id}
              todo={todo}
              onExit={onEditCancel}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          ) : (
            <Todo
              key={todo.id}
              todo={todo}
              onToggle={onToggle}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          )
        )}
      </div>
    );
  }
}

export default TodoList;
