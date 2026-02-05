import { useEffect, useState } from "react";
import TaskCalendar from "./components/TaskCalendar";

function App() {

  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [newTaskDate, setNewTaskDate] = useState(null);

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
        completed: false,
        dueDate: dueDate || null
      })
    })
      .then(res => res.json())
      .then(createdTask => {
        setTasks([...tasks, createdTask]);
        setNewTaskTitle("");
      });
  };

  const deleteTask = async (id) => {
    await fetch(`http://localhost:8080/api/tasks/${id}`, {
      method: "DELETE",
    });

    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Task Organizer</h1>

      <TaskCalendar />

      <input
        type="text"
        placeholder="Enter new task..."
        value={newTaskTitle}
        onChange={(e) => setNewTaskTitle(e.target.value)}
      />

      <input
        type="date"
        value={newTaskDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <button onClick={addTask}>Add Task</button>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title} — {task.completed ? "done" : "not done"}

            <button onClick={() => deleteTask(task.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

