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
    },
    weight: {
      type: Number,
    },
    notes: {
      type: String,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    events: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Events",
      },
    ],
  },
  { timestamps: true }
);

const Dog = mongoose.model("Dog", dogSchema);

module.exports = Dog;
