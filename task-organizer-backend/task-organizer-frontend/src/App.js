import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import TaskCalendar from "./components/TaskCalendar";
import "./App.css";

function App() {

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [editingDescription, setEditingDescription] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [editingDueDate, setEditingDueDate] = useState("");

  // loading tasks from backend
  useEffect(() => {
    setLoading(true);
    setError("");

    fetch(process.env.REACT_APP_API_URL)
      .then(res => {
        if (!res.ok) {
          throw new Error("Failed to load tasks");
        }
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          setTasks(data);
        } else {
          setTasks([]);
        }
      })
      .catch(err => {
        console.error("ERROR LOADING TASKS:", err);
        setError("Failed to load tasks");
        setTasks([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // adding tasks
  const addTask = async (task) => {
    const res = await fetch(process.env.REACT_APP_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(task)
    });

    if (!res.ok) {
      const error = await res.json();
      alert(error.title || "Failed to create task");
      return;
    }

    const data = await res.json();
    setTasks(prev => [...prev, data]);
    setMessage("Task added successfully");
    setTimeout(() => setMessage(""), 2500);
  };


  // deleting tasks
  const deleteTask = async (id) => {
    const confirmDelete = window.confirm("Delete this plan?");
    if (!confirmDelete) return;
    await fetch(`${process.env.REACT_APP_API_URL}/${id}`, {
      method: "DELETE",
    });
    setTasks(prev => prev.filter(task => task.id !== id));
    setMessage("Task deleted");
    setTimeout(() => setMessage(""), 2500);
  };

  // toggle completed
  const toggleTask = async (task) => {
    const updatedTask = {
      ...task,
      completed: !task.completed
    };

    const res = await fetch(`${process.env.REACT_APP_API_URL}/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedTask)
    });

    const data = await res.json();
    setTasks(prev => prev.map(t => t.id === task.id ? data : t));
  };

  // editing start
  const startEdit = (task) => {
    setEditingTaskId(task.id);
    setEditingTitle(task.title);
    setEditingDueDate(task.dueDate || "");
    setEditingDescription(task.description || "");
  };

  // save editing
  const saveEdit = (task) => {
    fetch(`${process.env.REACT_APP_API_URL}/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...task,
        title: editingTitle,
        description: editingDescription,
        dueDate: editingDueDate || null
      })
    })
      .then(res => res.json())
      .then(updatedTask => {
        setTasks(prev => prev.map(t => t.id === task.id ? updatedTask : t));
        setEditingTaskId(null);
        setEditingTitle("");
        setEditingDueDate("");
        setMessage("Task updated");
        setTimeout(() => setMessage(""), 2500);
      });
  };

  return (
    <div className="app-container">
      <h1>DayPlan</h1>
      <p className = "subtitle">Plan your day. Track what matters </p>

      <div style={{ display: "flex", gap: "30px", alignItems: "flex-start" }}>

        <div style={{ flex: 1 }}>
            <h2>My Plans ({tasks.length})</h2>

            <div className="task-input-row">
              <TaskForm onAddTask={addTask} />
            </div>

            {loading && <p style={{ color: "#555" }}>Loading tasks...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {message && (
              <p style={{ color: "green", fontWeight: "bold" }}>
                {message}
              </p>
            )}

            <TaskList
              tasks={tasks}
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
          </div>

          <div style={{ width: "350px" }}>
            <TaskCalendar />
          </div>

          </div>
        </div>
        );
      }
        export default App;


