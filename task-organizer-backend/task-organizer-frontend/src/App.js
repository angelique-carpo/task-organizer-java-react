import { useEffect, useState } from "react";

function App() {

  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/api/tasks")
      .then(res => res.json())
      .then(data => setTasks(data));
  }, []);

  const addTask = () => {
    if (!newTaskTitle.trim()) return;

    fetch("http://localhost:8080/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: newTaskTitle,
        completed: false
      })
    })
      .then(res => res.json())
      .then(createdTask => {
        setTasks([...tasks, createdTask]);
        setNewTaskTitle("");
      });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Task Organizer</h1>

      <input
        type="text"
        placeholder="Enter new task..."
        value={newTaskTitle}
        onChange={(e) => setNewTaskTitle(e.target.value)}
      />

      <button onClick={addTask}>Add Task</button>

      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.title} — {task.completed ? "done" : "not done"}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

