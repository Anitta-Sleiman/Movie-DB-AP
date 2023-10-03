const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const movieSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
      min: 1000,
      max: 9999,
    },
    rating: {
      type: Number,
      default: 4,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movie", movieSchema);
