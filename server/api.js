const express = require("express");
const router = express.Router();
const path = require("path");
const Row = require("./models/Row");
const User = require("./models/User");

router.get("/rows", (req, res) => {
  const filter = {
    userId: req.query.userId,
    startDate: req.query.startDate,
    tableType: req.query.tableType,
  };
  if (req.query.endDate) {
    filter.startDate = { $gte: req.query.startDate, $lte: req.query.endDate }; //check if in date range
  }
  Row.find(filter, (error, rows) => {
    if (error) {
      console.log(error);
    } else {
      res.send(
        rows.map((row) => {
          return { id: row._id, data: row.data };
        })
      );
    }
  });
});

router.post("/rows", (req, res) => {
  Row.create({
    userId: req.body.userId,
    data: req.body.data,
    startDate: req.body.startDate,
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

// Gets all non-admin users with location filter if given through query params
router.get("/users", (req, res) => {
  const filter = { admin: false };
  if (req.query.location) {
    filter.location = req.query.location;
  }

  User.find(filter, (err, users) => {
    res.send(
      users.map((user) => {
        return {
          id: user._id,
          name: user.name,
          email: user.email,
          location: user.location,
        };
      })
    );
  });
});

// Creates a User document if email does not exist
router.put("/user", (req, res) => {
  User.findOneAndUpdate(
    { email: req.body.email },
    {
      name: req.body.name,
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

// Gets all admin users
router.get("/admins", (req, res) => {
  User.find({ admin: true }, (error, admins) => {
    if (error) {
      console.log(error);
    } else {
      res.send(admins);
    }
  });
});

router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.sendFile(
    path.join(path.basename(path.dirname(__dirname)), "client/build/index.html")
  );
});

module.exports = router;
