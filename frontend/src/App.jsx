import { useEffect, useState } from "react";
import API from "./api";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [dark, setDark] = useState(false);

  const fetchTasks = async () => {
    const res = await API.get("/api/tasks");
    setTasks(res.data);
  };

  const addTask = async () => {
    if (!title) return;
    await API.post("/api/tasks", { title });
    setTitle("");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await API.delete(`/api/tasks/${id}`);
    fetchTasks();
  };

  const toggleTask = async (id) => {
    await API.put(`/api/tasks/${id}`);
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className={dark ? "app dark" : "app"}>
      <div className="container">

        <div className="header">
          <h1>✨ Task Manager</h1>
          <button
            className="toggle-btn"
            onClick={() => setDark(!dark)}
          >
            🌙
          </button>
        </div>

        <div className="input-group">
          <input
            placeholder="Enter task..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button className="add-btn" onClick={addTask}>
            Add
          </button>
        </div>

        {tasks.map((t) => (
          <div className="task" key={t._id}>
            <span
              onClick={() => toggleTask(t._id)}
              className={t.completed ? "completed" : ""}
              style={{ cursor: "pointer" }}
            >
              {t.title}
            </span>

            <button
              className="delete-btn"
              onClick={() => deleteTask(t._id)}
            >
              X
            </button>
          </div>
        ))}

      </div>
    </div>
  );
}

export default App;