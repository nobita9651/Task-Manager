import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  // Example: Personalized greeting based on user authentication status
  const isAuthenticated = false; // Replace with actual authentication state
  const user = { name: "John Doe" }; // Replace with actual user data

  return (
    <div>
      <h1>Welcome to Task Manager</h1>
      {isAuthenticated ? (
        <p>Hello, {user.name}! Here are your tasks.</p>
      ) : (
        <p>Log in or register to manage your tasks.</p>
      )}
      <div>
        <Link to="/login">
          <button>Login</button>
        </Link>
        <Link to="/register">
          <button>Register</button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
