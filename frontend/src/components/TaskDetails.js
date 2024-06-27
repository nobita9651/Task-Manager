import React, { useEffect, useState } from "react";
import axios from "../services/api";
import { useParams } from "react-router-dom";

const TaskDetails = () => {
  const { id } = useParams();
  const [task, setTask] = useState({});

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await axios.get(`/api/tasks/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setTask(res.data);
      } catch (error) {
        console.error("Error fetching task:", error);
        // Handle error, e.g., setTask(null) or display an error message
      }
    };
    fetchTask();
  }, [id]);

  return (
    <div>
      <h1>Task Details</h1>
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <p>Completed: {task.completed ? "Yes" : "No"}</p>
      <button>
        <a href={`/edit-task/${task._id}`}>Edit Task</a>
      </button>
    </div>
  );
};

export default TaskDetails;
