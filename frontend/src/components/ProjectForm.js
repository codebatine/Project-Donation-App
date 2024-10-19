import React, { useState } from 'react';
import { createProject } from '../services/api';
import { useNavigate } from 'react-router-dom';

const ProjectForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [endDate, setEndDate] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await createProject({ name, description, targetAmount, endDate }, token);
      alert('Project submitted successfully');
      navigate('/projects');
    } catch (error) {
      alert('Project creation failed. Please try again.');
    }
  };

  return (
    <div className="project-form-container">
      <h2>Create a New Project</h2>
      <form
        className="project-form"
        onSubmit={handleSubmit}
      >
        <div className="form-group">
          <label htmlFor="name">Project Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter project name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Project Description</label>
          <textarea
            id="description"
            placeholder="Enter project description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="targetAmount">Target Amount ($)</label>
          <input
            type="number"
            id="targetAmount"
            placeholder="Enter target amount in USD"
            value={targetAmount}
            onChange={(e) => setTargetAmount(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="endDate">End Date</label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
        <button
          className="submit-btn"
          type="submit"
        >
          Submit Project
        </button>
      </form>
    </div>
  );
};

export default ProjectForm;
