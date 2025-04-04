const mongoose = require("mongoose");

const slotbookingSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      require: true,
    },
    userInfo: {
      type: Array,
      default: [],
    },
    time: {
      type: String,
      require: true,
    },
    status: {
      type: String,
      require: true,
      default: "pending",
    },
  },
  { timestamps: true }
);

const slotbookingModel = mongoose.model("slotbooking", slotbookingSchema);
module.exports = slotbookingModel;
