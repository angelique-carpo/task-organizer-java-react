import React from "react";

function TaskItem({
  task,
  toggleTask,
  deleteTask,
  startEdit,
  saveEdit,
  editingTaskId,
  editingTitle,
  editingDescription,
  editingDueDate,
  setEditingTitle,
  setEditingDescription,
  setEditingDueDate
}) {
  return (
    <div className="task-row">

      <div className="task-info">
        <div className="task-title">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleTask(task)}
          />

          {editingTaskId === task.id ? (
            <input
              value={editingTitle}
              onChange={(e) => setEditingTitle(e.target.value)}
              className="task-input"
            />
          ) : (
            <span
              style={{
                textDecoration: task.completed ? "line-through" : "none",
                color: task.completed ? "#888" : "#000"
              }}
            >
              {task.title}
            </span>
          )}
        </div>

        <div className="task-desc">
          {editingTaskId === task.id ? (
            <input
              value={editingDescription}
              onChange={(e) => setEditingDescription(e.target.value)}
              className="task-input"
            />
          ) : (
            task.description
          )}
        </div>
      </div>

      <div>

        {editingTaskId === task.id ? (
          <input
            type="date"
            value={editingDueDate}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => setEditingDueDate(e.target.value)}
            className="task-date"
          />
        ) : (
          <span className="task-date">
            {task.dueDate
              ? new Date(task.dueDate).toLocaleDateString("el-GR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric"
                })
              : ""}
          </span>
        )}

        <button
          className="delete-btn"
          onClick={() => deleteTask(task.id)}
        >
          Delete
        </button>

        {editingTaskId === task.id ? (
          <button onClick={() => saveEdit(task)}>
            Save
          </button>
        ) : (
          <button onClick={() => startEdit(task)}>
            Edit
          </button>
        )}

      </div>
    </div>
  );
}

export default TaskItem;


