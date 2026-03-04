const express = require("express");

const router = express.Router();

router.get("/generate", (req, res) => {
  console.log("Route hit!");

  res.json({
    message: "API working "
  });
});

module.exports = router;