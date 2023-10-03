// import movie-modules
const Movie = require("../modules/movies-modules");

// import mongoose
const mongoose = require("mongoose");

// router.get("/time", (req, res) => {
//   const currentTime = new Date().toLocaleTimeString([], {
//     hour: "2-digit",
//     minute: "2-digit",
//     hour12: false,
//   });
//   res.status(200).json({ status: 200, message: currentTime });
// });

// GET all movies by criteria
const getMoviesByCriteria = async (req, res) => {
  const sortingCriteria = req.params.sortingCriteria;
  try {
    let movies;

    if (sortingCriteria === "by-date") {
      movies = await Movie.find({}).sort({ releaseDate: 1 });
    } else if (sortingCriteria === "by-rating") {
      movies = await Movie.find({}).sort({ rating: -1 });
    } else if (sortingCriteria === "by-title") {
      movies = await Movie.find({}).sort({ title: 1 });
    } else {
      movies = await Movie.find({});
    }

    if (movies.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "There are no movies available right now",
      });
    }

    res.status(200).json({ status: 200, data: movies });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      status: 500,
      error: true,
      message: "Internal Server error",
    });
  }
};

// // Get a single movie
const getMovie = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      status: 404,
      error: true,
      message: `The movie does not exist`,
    });
  }

  try {
    const movie = await Movie.findById(id);

    if (!movie) {
      return res.status(404).json({
        status: 404,
        error: true,
        message: `The movie does not exist`,
      });
    }

    res.status(200).json({ status: 200, data: movie });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      status: 500,
      error: true,
      message: "Internal Server error",
    });
  }
};

// Create a new movie
const createMovie = async (req, res) => {
  const { title, year, rating } = req.body;

  // add doc to db
  try {
    const movie = await Movie.create({ title, year, rating });
    res.status(200).json(movie);
  } catch (error) {
    res.status(403).json({
      error: error.message,
      message: "you cannot create a movie without providing a title and a year",
    });
  }
};

// DELETE a movie
const deleteMovie = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      status: 404,
      error: true,
      message: `The movie does not exist`,
    });
  }

  const movie = await Movie.findByIdAndDelete(id);

  if (!movie) {
    return res.status(404).json({
      status: 404,
      error: true,
      message: `The movie does not exist`,
    });
  }

  const movies = await Movie.find({});
  res.status(200).json({ status: 200, data: movies });
};

// UPDATE a movie
const updateMovie = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      status: 404,
      error: true,
      message: `The movie does not exist`,
    });
  }
  const movie = await Movie.findByIdAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  if (!movie) {
    return res.status(404).json({
      status: 404,
      error: true,
      message: `The movie does not exist`,
    });
  }
  res.status(200).json(movie);
};

module.exports = {
  createMovie,
  getMoviesByCriteria,
  getMovie,
  deleteMovie,
  updateMovie,
};
