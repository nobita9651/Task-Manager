import React from "react";
import { Routes, Route } from "react-router-dom";
import TaskList from "./components/TaskList";
import TaskDetails from "./components/TaskDetails";
import TaskForm from "./components/TaskForm";
import Login from "./components/Login";
import Register from "./components/Register";
import LandingPage from "./components/LandingPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tasks" element={<TaskList />} />
        <Route path="/task/:id" element={<TaskDetails />} />
        <Route path="/new-task" element={<TaskForm />} />
        <Route path="/edit-task/:id" element={<TaskForm />} />
      </Routes>
    </div>
  );
}

export default App;
