const express = require("express");
const router = express.Router();

// Get/Read request api's
router.get("/", (req, res) => {
  // res.send("Hello World!");
  res.render("index", { title: "My Express app", message: "Hello" });
});

module.exports = router;
