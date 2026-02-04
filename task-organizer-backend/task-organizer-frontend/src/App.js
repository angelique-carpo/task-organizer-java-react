import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/tasks")
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Task Organizer</h1>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title} – {task.completed ? "✅ done" : "❌ not done"}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
