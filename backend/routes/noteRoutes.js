import express from "express";
import Note from "../models/Note.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Create Note
router.post("/", auth, async (req, res) => {
  try {
    const { content, type } = req.body;
    const newNote = new Note({ user: req.user.userId, content, type });
    await newNote.save();
    res.json(newNote);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
});

// Get Notes
router.get("/", auth, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.userId }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
});

// Delete Note
router.delete("/:id", auth, async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ msg: "Note deleted" });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
});

export default router;
