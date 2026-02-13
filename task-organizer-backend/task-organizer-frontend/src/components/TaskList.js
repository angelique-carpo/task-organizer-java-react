import React from "react";
import TaskItem from "./TaskItem";

function TaskList({
  tasks,
  loading,
  error,
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
  if (loading) {
    return <p style={{ color: "#555" }}>Loading tasks...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  if (tasks.length === 0) {
    return <p>No plans yet — start by adding one ✨</p>;
  }

  return (
    <div>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
          startEdit={startEdit}
          saveEdit={saveEdit}
          editingTaskId={editingTaskId}
          editingTitle={editingTitle}
          editingDescription={editingDescription}
          editingDueDate={editingDueDate}
          setEditingTitle={setEditingTitle}
          setEditingDescription={setEditingDescription}
          setEditingDueDate={setEditingDueDate}
        />
      ))}
    </div>
  );
}

export default TaskList;

