
import { Movie } from "../models/movie.model.js";
import { toArray } from "../utils/toArray.js";
import fs from "fs/promises";
import path from "path";


export const addMovie = async (req, res) => {
    try {
        const { mId, movieName, movieDescription, movieGenre, movieYear, durationMinutes, rating, languages, cast, isPublished } = req.body;
        const file = req.file;

        if (!mId || !movieName) {
            return res.status(400).json({ error: "mId and movieName are required!" });
        }

        if (!file) {
            return res.status(400).json({ error: "Movie poster is not provided" });
        }

        const genreArray = toArray(movieGenre);
        const languagesArray = toArray(languages);
        const castArray = toArray(cast);

        const uploadFilePath = `/uploads/${file.filename}`;

        const newMovie = new Movie({
            mId,
            movieName,
            movieDescription,
            movieGenre: genreArray,
            movieYear: movieYear ? parseInt(movieYear) : undefined,
            durationMinutes: durationMinutes ? parseInt(durationMinutes) : undefined,
            rating: rating ? parseFloat(rating) : undefined,
            languages: languagesArray,
            cast: castArray,
            moviePoster: uploadFilePath,
            isPublished: isPublished === 'true' || isPublished === true
        });

        const savedMovie = await newMovie.save();
        res.status(201).json({ savedMovie });
    } catch (error) {
        console.error("Error in addMovie controller:", error);
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
};


//delete movie

export const deleteMovie = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: "Id is not provided!" });
        }

        const movie = await Movie.findById(id);
        if (!movie) {
            return res.status(404).json({ error: "No Movie Found!" });
        }

        if (movie.moviePoster) {
            const relativePath = movie.moviePoster.replace(/^\//, "");
            const absolutePath = path.join(process.cwd(), relativePath);

            try {
                await fs.unlink(absolutePath);
            } catch (error) {
                console.warn("Could not delete old image:", error.message);
            }
        }

        await Movie.findByIdAndDelete(id);
        return res.status(200).json({ message: "Movie deleted successfully" });
    } catch (error) {
        console.error("Error in deleteMovie controller:", error);
        return res.status(500).json({ error: "Internal server error", details: error.message });
    }
};

//get

export const getMovies = async (req, res) => {
    try {
        const result = await Movie.find();
        res.status(200).json(result);
    } catch (error) {
        console.error("Error in getMovies controller:", error);
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
};

export const getMovieById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: "Id is not provided!" });
        }

        const movie = await Movie.findById(id);
        if (!movie) {
            return res.status(404).json({ error: "No movie found!" });
        }

        return res.status(200).json(movie);
    } catch (error) {
        console.error("Error in getMovieById controller:", error);
        return res
            .status(500)
            .json({ error: "Internal server error", details: error.message });
    }
};

//search




export const searchMovies = async (req, res) => {
    try {
        const { title } = req.query;
        if (!title) {
            return res.status(400).json({ error: "Title query parameter is required" });
        }
        const result = await Movie.find({
            movieName: { $regex: title, $options: "i" }
        });
        res.status(200).json(result);
    } catch (error) {
        console.error("Error in searchMovies controller:", error);
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
};


//update movie

export const updateMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const file = req.file;

        const {
            mId,
            movieName,
            movieDescription,
            movieGenre,
            movieYear,
            durationMinutes,
            rating,
            languages,
            cast,
            isPublished,
        } = req.body;

        if (!id) {
            return res.status(400).json({ error: "Id is not provided!" });
        }

        const movie = await Movie.findById(id);
        if (!movie) {
            return res.status(404).json({ error: "No movie found!" });
        }

        const data = {};

        const genreArr = toArray(movieGenre);
        const languageArr = toArray(languages);
        const castArr = toArray(cast);

        if (mId) data.mId = mId;
        if (movieName) data.movieName = movieName;
        if (movieDescription) data.movieDescription = movieDescription;
        if (genreArr) data.movieGenre = genreArr;
        if (movieYear) data.movieYear = parseInt(movieYear, 10);
        if (durationMinutes) data.durationMinutes = parseInt(durationMinutes, 10);
        if (rating) data.rating = parseFloat(rating);
        if (languageArr) data.languages = languageArr;
        if (castArr) data.cast = castArr;

        if (typeof isPublished !== "undefined") {
            data.isPublished = isPublished === "true" || isPublished === true;
        }

        if (file) {
            const poster = movie.moviePoster;

            if (poster) {
                const relativePath = poster.replace(/^\//, "");
                const absolutePath = path.join(process.cwd(), relativePath);

                try {
                    await fs.unlink(absolutePath);
                } catch (error) {
                    console.warn("Could not delete old image:", error.message);
                }
            }

            data.moviePoster = `/uploads/${file.filename}`;
        }

        const result = await Movie.findByIdAndUpdate(movie._id, { $set: data }, { new: true });
        return res.status(200).json(result);
    } catch (error) {
        console.error("Error in updateMovie controller:", error);
        return res
            .status(500)
            .json({ error: "Internal server error", details: error.message });
    }
};