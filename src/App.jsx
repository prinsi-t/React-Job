import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./components/pages/Home";
import HomePage from "./components/pages/HomePage";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import { useAuth } from "./context/AuthContext";

import MainLayout from "./layouts/MainLayout";
import JobsPage from "./components/pages/JobsPage";
import NotFoundPage from "./components/pages/NotFoundPage";
import AddJobPage from "./components/pages/AddJobPage";
import JobPage from "./components/pages/JobPage";
import EditJobPage from "./components/pages/EditJobPage";
import ProtectedRoute from "./components/ProtectedRoute";

import JobListings from "./components/JobListings";

const App = () => {
  const { user } = useAuth();

  const addJob = async (newJob) => {
    await fetch("http://localhost:5000/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newJob),
    });
  };

  const deleteJob = async (id) => {
    await fetch(`http://localhost:5000/api/jobs/${id}`, {
      method: "DELETE",
    });
  };

  const updateJob = async (job) => {
    await fetch(`http://localhost:5000/api/jobs/${job.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(job),
    });
  };

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={user ? <HomePage /> : <Home />} />

        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        <Route
          path="/jobs"
          element={
            <ProtectedRoute>
              <JobListings />
            </ProtectedRoute>
          }
        />

        <Route
          path="add-job"
          element={
            <ProtectedRoute>
              <AddJobPage addJobSubmit={addJob} />
            </ProtectedRoute>
          }
        />

        <Route
          path="edit-job/:id"
          element={
            <ProtectedRoute>
              <EditJobPage updateJobSubmit={updateJob} />
            </ProtectedRoute>
          }
        />

        <Route
          path="jobs/:id"
          element={
            <ProtectedRoute>
              <JobPage deleteJob={deleteJob} />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default App;