import React, { useEffect, useState } from 'react';
import { getProjects } from '../services/api';
import { Link } from 'react-router-dom';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getProjects();
        setProjects(response.data);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      }
    };

    fetchProjects();
  }, []);

  const formatToCET = (dateString) => {
    const options = {
      timeZone: 'Europe/Sarajevo',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-GB', options).format(date);
  };

  // Helper function to format currency in USD
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const calculateProgress = (raisedAmount, targetAmount) => {
    return Math.min((raisedAmount / targetAmount) * 100, 100).toFixed(2);
  };

  return (
    <div>
      <h1>Projects</h1>
      <ul>
        {projects.map((project) => (
          <li
            key={project._id}
            className="project"
          >
            <h2>{project.name}</h2>
            <p>{project.description}</p>
            <p>Target Amount: {formatCurrency(project.targetAmount)}</p>
            <p>Raised Amount: {formatCurrency(project.raisedAmount)}</p>
            <p>End Date: {formatToCET(project.endDate)}</p>
            {/* Progress Bar */}
            <div className="progress-container">
              <div className="progress-bar">
                <div
                  className="progress"
                  style={{
                    width: `${calculateProgress(
                      project.raisedAmount,
                      project.targetAmount,
                    )}%`,
                  }}
                ></div>
              </div>
              {/* Displaying the percentage */}
              <p className="progress-percentage">
                {calculateProgress(project.raisedAmount, project.targetAmount)}%
              </p>
            </div>
            <Link
              to={`/projects/${project._id}`}
              className="view-details-button"
            >
              View Details
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
