const express = require("express");
const router = express.Router();
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");
var fetchuser = require("../middleware/fetchuser");
router.get("/", (req, res) => {
  res.json([]);
});
// Add a note. POST "api/notes/add-note" No login required
router.post(
  "/add-note",
  body("title", "Invalid-title").isLength({ min: 5 }),
  body("description", "You got to use more words").isLength({ min: 1 }),
  fetchuser,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { title, description, category } = req.body;
      const note = new Notes({
        title,
        description,
        category,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error");
    }
  }
);
// Fetch Notes of a User. GET "api/notes/fetch-note"  login required
router.get(
  "/fetch-notes",

  fetchuser,
  async (req, res) => {
    try {
      const notes = await Notes.find({ user: req.user.id });
      res.json(notes);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error");
    }
  }
);
// Update Note of a User. PUT "api/notes/update-note/:id"  login required
router.put("/update-note/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (category) {
      newNote.category = category;
    }

    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }
    if (note.user.toString() !== req.user.id) {
      {
        return res.status(401).send("You don;t have the authourity");
      }
    }
    note = await Notes.findByIdAndUpdate(req.params.id, newNote, { new: true });
    res.json(note);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error");
  }
});
// Delete Note of a User. PUT "api/notes/delete-note/:id"  login required
router.delete("/delete-note/:id", fetchuser, async (req, res) => {
  try {
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }
    if (note.user.toString() !== req.user.id) {
      {
        return res.status(401).send("You don;t have the authourity");
      }
    }
    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ message: "successful", note: note });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error");
  }
});
module.exports = router;
