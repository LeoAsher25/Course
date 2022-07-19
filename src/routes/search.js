const express = require("express");
const router = express.Router(); 

// router.get("/", SearchController.index);
router.get("/", (req, res) => {
  res.send("In Search");
});

module.exports = router;
