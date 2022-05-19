const mongoose = require("mongoose");

const RowSchema = new mongoose.Schema(
  {
    userId: mongoose.ObjectId,
    data: Array,
    weekStartDate: Date,
    tableType: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Row", RowSchema);
