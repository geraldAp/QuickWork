const Project = require("../models/projectModel");
const mongoose = require("mongoose");

//get all Projects
const getProjects = async (req, res) => {

  // getting all Projects for developers  
  const Projects = await Project.find({}).sort({ createdAt: -1 });

  res.status(200).json(Projects);
};

// get admin Projects
const getAdminProjects = async (req, res) => {
   // the id from the middle ware for protecting the api routes 
    const user_id = req.user._id
  //get Projects for the  admin based on the user id
  const Projects = await Project.find({user_id}).sort({ createdAt: -1 });
  res.status(200).json(Projects);
};

//get a single Project
const getProject = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such project" });
  }

  const project = await Project.findById(id);

  if (!project) {
    return res.status(404).json({ error: "No such " });
  }

  res.status(200).json(project);
};

// create new Project
const createProject = async (req, res) => {
  const { title, description, devSpec, details,budget } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!description) {
    emptyFields.push("description");
  }
  if (!devSpec) {
    emptyFields.push("devSpec");
  }
  if (!details) {
    emptyFields.push("details");
  }
  if (!budget) {
    emptyFields.push('budget');
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }
  // add doc to db
  try {
    // the id from the middle ware for protecting the api routes 
    const user_id = req.user._id
    const project = await Project.create({
      title,
      budget,
      description,
      devSpec,
      details,
      user_id
    });
    res.status(200).json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a  Project
const deleteProject = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  const project = await Project.findOneAndDelete({ _id: id });

  if (!project) {
    return res.status(400).json({ error: "No such workout" });
  }

  res.status(200).json(project);
};

//Update a project
const updateProject = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  const project = await Project.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!project) {
    return res.status(400).json({ error: "No such workout" });
  }

  res.status(200).json(project);
};

module.exports = {
  getProjects,
  getProject,
  createProject,
  deleteProject,
  updateProject,
  getAdminProjects
};
