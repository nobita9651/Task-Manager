import React, { useEffect, useState } from "react";
import axios from "../services/api";
import { Link } from "react-router-dom";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get("/api/tasks", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setTasks(res.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
      // Handle specific errors if needed
    }
  };

  return (
    <div>
      <h1>Task List</h1>
      <Link to="/new-task">Add New Task</Link>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <Link to={`/task/${task._id}`}>{task.title}</Link>
            <button onClick={() => handleDelete(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
