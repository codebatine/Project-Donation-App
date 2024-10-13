import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const signup = (userData) => api.post('/auth/signup', userData);
export const login = (userData) => api.post('/auth/login', userData);
export const createProject = (projectData, token) =>
  api.post('/projects', projectData, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const getProjects = () => api.get('/projects');
export const approveProject = (projectId, token) =>
  api.post(
    `/projects/approve/${projectId}`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
export const donate = async (data, token) => {
  const response = await axios.post(
    'http://localhost:5000/api/projects/donate',
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};
