import React from "react";

export default function Footer({ todos, onClear }) {
  if (todos.length === 0) {
    return null;
  }

  const pendingCount = todos.filter(td => td.status === "pending").length;
  const hasCompleted = pendingCount < todos.length;
  return (
    <div className="footer">
      <span className="pending-count">
        {pendingCount > 1
          ? `${pendingCount} items left`
          : `${pendingCount} item left`}
      </span>
      {hasCompleted && (
        <span className="clear-completed" onClick={onClear}>
          Clear completed
        </span>
      )}
    </div>
  );
}
