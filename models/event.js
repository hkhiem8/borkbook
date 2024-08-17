const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
    },
    dog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dog",
      required: true,
    },
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
