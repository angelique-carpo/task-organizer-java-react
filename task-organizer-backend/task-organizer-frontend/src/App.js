import { useEffect, useState } from "react";
import TaskCalendar from "./components/TaskCalendar";
import "./App.css";

function App() {

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDate, setNewTaskDate] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [editingDescription, setEditingDescription] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [editingDueDate, setEditingDueDate] = useState("");

  // loading tasks from backend
  useEffect(() => {
    fetch("http://localhost:8080/api/tasks")
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
        setTasks([]);
      });
  }, []);

  // adding tasks
  const addTask = async () => {
    const res = await fetch("http://localhost:8080/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: title,
        description: description,
        dueDate: dueDate,
        completed: false
      })
    });

    if (!res.ok) {
      const error = await res.json();
      alert(error.title || "Failed to create task");
      return;
    }

    const data = await res.json();
    setTasks([...tasks, data]);
  };


  // deleting tasks
  const deleteTask = async (id) => {
    const confirmDelete = window.confirm("Delete this plan?");
    if (!confirmDelete) return;
    await fetch(`http://localhost:8080/api/tasks/${id}`, {
      method: "DELETE",
    });
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  // toggle completed
  const toggleTask = async (task) => {
    const updatedTask = {
      ...task,
      completed: !task.completed
    };

    const res = await fetch(`http://localhost:8080/api/tasks/${task.id}`, {
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
    fetch(`http://localhost:8080/api/tasks/${task.id}`, {
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

            <input
              type="text"
              placeholder="Insert plan title..."
              className="task-input"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
            />

            <input
              type="text"
              placeholder="Plan description..."
              className="task-input"
              value={newTaskDescription}
              onChange={(e) => setNewTaskDescription(e.target.value)}
            />

            <input
              type="date"
              className="task-date"
              value={newTaskDate}
              onChange={(e) => setNewTaskDate(e.target.value)}
              placeholder="dd/mm/yyyy"
            />

            <button className="add-btn" onClick={addTask}>
              Add Plan
            </button>
          </div>

          <div>
            {tasks.length === 0 ? (
                <p style={{ color: "#777", marginTop: "10px" }}>
                  No plans yet — start by adding one ✨
                </p>
              ) : (
                tasks.map(task => (
              <div key={task.id} className="task-row">

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
                      onChange={(e) => setEditingDueDate(e.target.value)}
                      className="task-date"
                    />
                  ) : (
                    <span className="task-date">
                      {task.dueDate
                        ? new Date(task.dueDate).toLocaleDateString("el-GR", {day:"2-digit",month:"2-digit",year:"numeric"})
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
               ))
            )}
          </div>
        </div>


        <div style={{ width: "350px" }}>
          <TaskCalendar />
        </div>

      </div>
    </div>
  );
}

export default App;


