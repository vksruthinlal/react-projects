
import { useState } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  function addTask(event) {
    event.preventDefault();

    const trimmedTask = task.trim();

    if (!trimmedTask) return;

    const newTask = {
      id: Date.now(),
      title: trimmedTask,
      completed: false,
    };

    setTasks((previousTasks) => [...previousTasks, newTask]);
    setTask("");
  }

  function toggleTask(id) {
    setTasks((previousTasks) =>
      previousTasks.map((item) =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  }

  function deleteTask(id) {
    setTasks((previousTasks) =>
      previousTasks.filter((item) => item.id !== id)
    );
  }

  const completedCount = tasks.filter((item) => item.completed).length;

  return (
    <main className="task-container">
      <section className="task-card">
        <h1>Task Manager</h1>
        <p className="subtitle">Organize your day, one task at a time.</p>

        <form className="task-form" onSubmit={addTask}>
          <input
            type="text"
            placeholder="Enter a new task..."
            value={task}
            onChange={(event) => setTask(event.target.value)}
            aria-label="New task"
          />
          <button type="submit">Add Task</button>
        </form>

        <div className="task-summary">
          <span>Total: {tasks.length}</span>
          <span>Completed: {completedCount}</span>
        </div>

        {tasks.length === 0 ? (
          <p className="empty-message">No tasks yet. Add your first task!</p>
        ) : (
          <ul className="task-list">
            {tasks.map((item) => (
              <li className="task-item" key={item.id}>
                <label className="task-label">
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => toggleTask(item.id)}
                  />
                  <span className={item.completed ? "completed" : ""}>
                    {item.title}
                  </span>
                </label>

                <button
                  className="delete-button"
                  type="button"
                  onClick={() => deleteTask(item.id)}
                  aria-label={`Delete ${item.title}`}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

export default App;
