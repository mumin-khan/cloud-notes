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
  body("description", "You got to use more words").isLength({ min: 8 }),
  fetchuser,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { title, description,category } = req.body;
      const note = new Notes({
        title, description, category, user: req.user.id
    })
    const savedNote = await note.save()
    res.json(savedNote)
    } catch (error) {
      console.error(error);
      res.status(500).send("Error");
    }
  }
);
// Fetch Notes of a User. GET "api/notes/add-note" No login required
router.get(
  "/fetch-notes",
  
  fetchuser,
  async (req, res) => {
    const errors = validationResult(req);
    
    try {
  
      const notes = await Notes.find({user:req.user.id})
    res.json(notes)
    } catch (error) {
      console.error(error);
      res.status(500).send("Error");
    }
  }
);
module.exports = router;
