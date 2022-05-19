const express = require("express");
const router = express.Router();
const Row = require("./models/Row");
const User = require("./models/User");

router.get("/rows", (req, res) => {
  Row.find(
    {
      email: req.query.email,
      weekStartDate: req.query.weekStartDate,
      tableType: req.query.tableType,
    },
    (error, rows) => {
      if (error) {
        console.log(error);
      } else {
        res.send(
          rows.map((row) => {
            return { id: row._id, data: row.data };
          })
        );
      }
    }
  );
});

router.post("/rows", (req, res) => {
  Row.create({
    userId: req.body.userId,
    data: req.body.data,
    weekStartDate: req.body.weekStartDate,
    tableType: req.body.tableType,
  })
    .then((event) => {
      res.send(event);
    })
    .catch((err) => console.log(err));
});

router.put("/rows", (req, res) => {
  Row.updateOne(
    { _id: req.body.rowObjId },
    { data: req.body.data },
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        res.sendStatus(204);
      }
    }
  );
});

router.delete("/rows/:rowObjId", (req, res) => {
  Row.deleteOne({ _id: req.params.rowObjId }, (error, result) => {
    if (error) {
      console.log(error);
    } else {
      res.sendStatus(204);
    }
  });
});

// Creates a User document if email does not exist
router.put("/user", (req, res) => {
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
