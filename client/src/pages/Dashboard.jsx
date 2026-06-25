import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import { useAuth } from "../context/AuthContext";
import TaskModal from "../components/TaskModal";

const FILTERS = ["All", "Pending", "In Progress", "Completed"];

function statusClass(status) {
  if (status === "Pending") return "status-badge status-pending";
  if (status === "In Progress") return "status-badge status-in-progress";
  if (status === "Completed") return "status-badge status-completed";
  return "status-badge";
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [mutating, setMutating] = useState(false);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const params = filter !== "All" ? { status: filter } : {};
      const { data } = await API.get("/tasks", { params });
      setTasks(data.tasks);
    } catch {
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const countAll = tasks.length;
  const countPending = tasks.filter((t) => t.status === "Pending").length;
  const countDone = tasks.filter((t) => t.status === "Completed").length;

  const handleCreate = async (form) => {
    setMutating(true);
    try {
      await API.post("/tasks", form);
      setModalOpen(false);
      fetchTasks();
    } finally {
      setMutating(false);
    }
  };

  const handleUpdate = async (form) => {
    setMutating(true);
    try {
      await API.put(`/tasks/${editingTask._id}`, form);
      setEditingTask(null);
      fetchTasks();
    } finally {
      setMutating(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this task?")) return;
    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
    } catch {}
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="dashboard-wrapper">
      <nav className="navbar">
        <span className="navbar-brand">QVS Tasks</span>
        <div className="navbar-right">
          <span className="navbar-user">👋 {user?.name}</span>
          <button className="navbar-logout" onClick={handleLogout}>
            Sign out
          </button>
        </div>
      </nav>

      <main className="dashboard-main">
        <div className="stats-row">
          <div className="stat-card">
            <span className="stat-card-label">Total Tasks</span>
            <span className="stat-card-value">{countAll}</span>
          </div>
          <div className="stat-card">
            <span className="stat-card-label">Pending</span>
            <span className="stat-card-value">{countPending}</span>
          </div>
          <div className="stat-card">
            <span className="stat-card-label">Completed</span>
            <span className="stat-card-value">{countDone}</span>
          </div>
        </div>

        <div className="toolbar">
          <div className="toolbar-left">
            <h2>My Tasks</h2>
          </div>
          <div style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
            <div className="filter-chips">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  className={`chip${filter === f ? " active" : ""}`}
                  onClick={() => setFilter(f)}
                >
                  {f}
                </button>
              ))}
            </div>
            <button className="btn-add" onClick={() => setModalOpen(true)}>
              <span style={{ fontSize: "1.1rem", lineHeight: 1 }}>+</span>
              New Task
            </button>
          </div>
        </div>

        {loading ? (
          <div className="spinner-wrap">
            <div className="spinner" />
          </div>
        ) : tasks.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📋</div>
            <h3>{filter === "All" ? "No tasks yet" : `No "${filter}" tasks`}</h3>
            <p>
              {filter === "All"
                ? "Create your first task to get started."
                : "Try a different filter or add a new task."}
            </p>
          </div>
        ) : (
          <div className="task-list">
            {tasks.map((task) => (
              <div key={task._id} className="task-card">
                <div className="task-card-body">
                  <div className="task-card-title">{task.title}</div>
                  {task.description && (
                    <div className="task-card-desc">{task.description}</div>
                  )}
                  <div className="task-card-meta">
                    <span className={statusClass(task.status)}>{task.status}</span>
                    <span className="task-date">{formatDate(task.createdAt)}</span>
                  </div>
                </div>
                <div className="task-card-actions">
                  <button
                    className="btn-outline"
                    style={{ fontSize: "0.80rem", padding: "6px 14px" }}
                    onClick={() => setEditingTask(task)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn-danger"
                    onClick={() => handleDelete(task._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {modalOpen && (
        <TaskModal
          mode="create"
          onClose={() => setModalOpen(false)}
          onSubmit={handleCreate}
          loading={mutating}
        />
      )}

      {editingTask && (
        <TaskModal
          mode="edit"
          task={editingTask}
          onClose={() => setEditingTask(null)}
          onSubmit={handleUpdate}
          loading={mutating}
        />
      )}
    </div>
  );
}
