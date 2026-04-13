import JobApplication from "../models/jobApplicationModel.js";

// ===== CREATE =====
const createApplication = async (req, res) => {
  try {
    const { company, position, status, notes } = req.body;

    const app = await JobApplication.create({
      company,
      position,
      status,
      notes: notes || "",
      userId: req.userId,
    });

    res.status(201).json(app);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// ===== GET ALL =====
const getApplications = async (req, res) => {
  try {
    const filter = { userId: req.userId, isDeleted: false };
    if (req.query.status) filter.status = req.query.status;

    const apps = await JobApplication.find(filter);
    res.json(apps);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// ===== GET BY ID =====
const getApplicationById = async (req, res) => {
  try {
    const app = await JobApplication.findOne({
      _id: req.params.id,
      userId: req.userId,
      isDeleted: false,
    });
    if (!app) return res.status(404).json({ error: "Application not found" });

    res.json(app);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// ===== UPDATE =====
const updateApplication = async (req, res) => {
  try {
    const { status, notes } = req.body;

    const updated = await JobApplication.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { status, notes },
      { new: true },
    );

    if (!updated)
      return res.status(404).json({ error: "Application not found" });

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// ===== DELETE =====
const deleteApplication = async (req, res) => {
  try {
    await JobApplication.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { isDeleted: true },
    );

    res.json({ message: "Application deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

export {
  createApplication,
  getApplications,
  getApplicationById,
  updateApplication,
  deleteApplication,
};
