const express = require('express');
const {
  createProject,
  approveProject,
  getAllProjects,
  donate,
} = require('../controllers/projectController');
const {
  authMiddleware,
  adminMiddleware,
} = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, createProject);
router.post(
  '/approve/:projectId',
  authMiddleware,
  adminMiddleware,
  approveProject,
);
router.get('/', getAllProjects);
router.post('/donate', authMiddleware, donate);

module.exports = router;
