const mongoose = require("mongoose");

const dogSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    breed: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: false,
    },
    weight: {
      type: Number,
      required: false,
    },
    notes: {
      type: String,
      required: false,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    events: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Events",
    }]
  },
  { timestamps: true }
);

const Dog = mongoose.model("Dog", dogSchema);

module.exports = Dog;
