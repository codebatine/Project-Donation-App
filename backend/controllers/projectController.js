const Project = require('../models/Project');

exports.createProject = async (req, res) => {
  const { name, description, targetAmount, endDate } = req.body;

  try {
    const project = await Project.create({
      name,
      description,
      targetAmount,
      endDate,
      user: req.user._id,
    });
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.approveProject = async (req, res) => {
  const { projectId } = req.params;

  try {
    const project = await Project.findByIdAndUpdate(
      projectId,
      { approved: true },
      { new: true },
    );
    res.status(200).json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.donate = async (req, res) => {
  const { projectId, amount } = req.body;

  try {
    const project = await Project.findById(projectId);
    if (!project || !project.approved)
      return res
        .status(404)
        .json({ message: 'Project not found or not approved' });

    project.raisedAmount += amount;
    await project.save();

    res.status(200).json({ message: `Donation of $${amount} successful!` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
