const express = require("express");
const router = express.Router();

router.post("/foodData", (req, res) => {
  try {
    // Sending the global food data arrays as a response
    res.send([global.food_items, global.foodCategory]);
  } catch (error) {
    console.error("Error while fetching food data: ", error.message);
    // Sending a 500 status for a server error
    res.status(500).send("Server error");
  }
});

module.exports = router;
