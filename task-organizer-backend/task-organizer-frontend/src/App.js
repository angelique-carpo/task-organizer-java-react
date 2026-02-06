import { useEffect, useState } from "react";
import TaskCalendar from "./components/TaskCalendar";

function App() {

  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [newTaskDate, setNewTaskDate] = useState(null);
  const [newTaskDescription, setNewTaskDescription] = useState("");

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
        description: newTaskDescription,
        completed: false,
        dueDate: newTaskDate
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

    <div style={{
      display: "flex",
      gap: "30px",
      alignItems: "flex-start"
    }}>

      {/* TASKS */}
      <div style={{ flex: 1 }}>

        <h2>My Tasks</h2>

        <input
          type="text"
          placeholder="Enter new task..."
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
        />

        <input
          type="text"
          placeholder="Task description..."
          value={newTaskDescription}
          onChange={(e) => setNewTaskDescription(e.target.value)}
        />

        <input
          type="date"
          value={newTaskDate}
          onChange={(e) => setNewTaskDate(e.target.value)}
        />

        <button onClick={addTask}>Add Task</button>

        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <strong>{task.title}</strong>
              <div>{task.description}</div>
              <div>{task.dueDate}</div>
              <button onClick={() => deleteTask(task.id)}>Delete</button>
            </li>
          ))}
        </ul>

      </div>

      {/* CALENDAR */}
      <div style={{ width: "350px" }}>
        <TaskCalendar />
      </div>

    </div>
  </div>
);

}

export default App;

