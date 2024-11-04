import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProjects } from '../services/api';
import Donation from './Donation';

const ProjectDetails = ({ token }) => {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await getProjects();
        const project = response.data.find((proj) => proj._id === id);
        setProject(project);
      } catch (error) {
        console.error('Error fetching project:', error);
      }
    };

    fetchProject();
  }, [id]);

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div className="project-details">
      <h2>{project.name}</h2>
      <p>{project.description}</p>
      <p>Target Amount: ${project.targetAmount}</p>
      <p>Raised Amount: ${project.raisedAmount}</p>
      <Donation
        project={project}
        token={token}
      />
    </div>
  );
};

export default ProjectDetails;
