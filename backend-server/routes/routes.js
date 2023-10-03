// import express
const express = require("express");

// router instace
const router = express.Router();

// import movieController functions
const {
  createMovie,
  getMoviesByCriteria,
  getMovie,
  deleteMovie,
  updateMovie,
} = require("../controllers/movieController");

// GET a single movie
router.get("/read/:id", getMovie);

// Get all movies by criteria or without criteria
router.get("/read/:sortingCriteria?", getMoviesByCriteria);

// POST a new movie
router.post("/", createMovie);

// // DELETE a movie
router.delete("/:id", deleteMovie);

// // UPDATE a movie
router.patch("/:id", updateMovie);

// export router
module.exports = router;
