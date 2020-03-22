const express = require("express");

const router = express.Router();

// @route Get api/contacts/
// @desc Get all contacts
// @access Private
router.get("/", (req, res) => {
  res.send("gets all contacts");
});

// @route POST api/contacts
// @desc add contact
// @access Public
router.post("/", (req, res) => {
  res.send("Add contacts ");
});

// @route PUT api/contacts/:id
// @desc update contact
// @access Public
router.put("/:id", (req, res) => {
  res.send("update contacts ");
});

// @route DELETE api/contacts/:id
// @desc delets contact
// @access Public
router.delete("/:id", (req, res) => {
  res.send("Delete contacts ");
});

module.exports = router;
