import React, { useEffect, useState } from 'react';
import { getProjects } from '../services/api';

const ProjectsList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await getProjects();
      setProjects(response.data);
    };

    fetchProjects();
  }, []);

  return (
    <div>
      <h2>Projects</h2>
      {projects.map((project) => (
        <div key={project._id}>
          <h3>{project.name}</h3>
          <p>{project.description}</p>
          <p>
            Target: ${project.targetAmount} | Raised: ${project.raisedAmount}
          </p>
          <p>End Date: {new Date(project.endDate).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
};

export default ProjectsList;
