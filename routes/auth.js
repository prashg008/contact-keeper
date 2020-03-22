const express = require("express");

const router = express.Router();

// @route Get api/auth
// @desc Get Logged in user
// @access Private
router.get("/", (req, res) => {
  res.send("gets logged in user ");
});

// @route POST api/auth
// @desc auth & login in user
// @access Public
router.post("/", (req, res) => {
  res.send("login in user ");
});

module.exports = router;
