// TaskForm.js
import React, { useEffect, useState } from "react";
import axios from "../services/api";
import { useParams, useNavigate } from "react-router-dom";

const TaskForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // State for form fields and error handling
  const [error, setError] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);

  // Fetch task details if editing an existing task
  useEffect(() => {
    const fetchTask = async () => {
      try {
        if (id) {
          const res = await axios.get(`/api/tasks/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          setTitle(res.data.title);
          setDescription(res.data.description);
          setCompleted(res.data.completed);
        }
      } catch (error) {
        console.error("Error fetching task:", error);
        setError("Failed to fetch task details. Please try again later.");
      }
    };

    fetchTask();
  }, [id]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const task = { title, description, completed };

    try {
      if (id) {
        await axios.put(`/api/tasks/${id}`, task, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
      } else {
        await axios.post("/api/tasks", task, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
      }
      navigate("/tasks");
    } catch (err) {
      console.error("handleSubmit Error:", err);
      if (err.response && err.response.status === 401) {
        setError("Authorization denied. Please login.");
      } else {
        setError("An error occurred while processing your request.");
      }
    }
  };

  // Handle checkbox state change
  const handleCheckboxChange = (e) => {
    setCompleted(e.target.checked);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label>
          Completed
          <input
            type="checkbox"
            checked={completed}
            onChange={handleCheckboxChange}
          />
        </label>
      </div>
      {error && <p>Error: {error}</p>}
      <button type="submit">{id ? "Update Task" : "Create Task"}</button>
    </form>
  );
};

export default TaskForm;
