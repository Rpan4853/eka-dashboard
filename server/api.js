const express = require("express");
const router = express.Router();
const Row = require("./models/Row");
const User = require("./models/User");

// Creates a User document if email does not exist
router.post("/user", (req, res) => {
  User.findOneAndUpdate(
    { email: req.body.email },
    {
      email: req.body.email,
      admin: req.body.admin,
      location: req.body.location,
    },
    { upsert: true, new: true, setDefaultsOnInsert: true },
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        res.send({
          admin: result.admin,
          id: result._id,
          location: result.location,
        });
      }
    }
  );
});

router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
