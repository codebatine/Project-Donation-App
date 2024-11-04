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
    <div className="project-list-container">
      <h1>Discover Projects</h1>
      <div className="project-cards">
        {projects.map((project) => (
          <div
            key={project._id}
            className="project-card"
          >
            <h2>{project.name}</h2>
            <p>{project.description}</p>
            <p>
              <strong>Target:</strong> {formatCurrency(project.targetAmount)}
            </p>
            <p>
              <strong>Raised:</strong> {formatCurrency(project.raisedAmount)}
            </p>
            <p>
              <strong>End Date:</strong> {formatToCET(project.endDate)}
            </p>

            <div className="progress-bar-container">
              <div className="progress-bar">
                <div
                  className={`progress ${
                    calculateProgress(
                      project.raisedAmount,
                      project.targetAmount,
                    ) === 100
                      ? 'goal-reached'
                      : ''
                  }`}
                  style={{
                    width: `${calculateProgress(
                      project.raisedAmount,
                      project.targetAmount,
                    )}%`,
                  }}
                >
                  {calculateProgress(
                    project.raisedAmount,
                    project.targetAmount,
                  ) === 100 && <span className="checkmark">&#10003;</span>}
                </div>
              </div>
              <span className="progress-percentage">
                {calculateProgress(project.raisedAmount, project.targetAmount)}%
                {calculateProgress(
                  project.raisedAmount,
                  project.targetAmount,
                ) === 100 && (
                  <span className="checkmark next-to"> &#10003;</span>
                )}
              </span>
            </div>

            <Link
              to={`/projects/${project._id}`}
              className="view-details-button"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectList;
