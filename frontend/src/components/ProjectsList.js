import React, { useEffect, useState } from 'react';
import { getProjects } from '../services/api';

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

  return (
    <div>
      <h1>Projects</h1>
      <ul>
        {projects.map((project) => (
          <li key={project._id}>
            <h2>{project.name}</h2>
            <p>{project.description}</p>
            <p>Target Amount: {project.targetAmount}</p>
            <p>End Date: {project.endDate}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
