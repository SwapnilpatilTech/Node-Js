import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { apiService } from "../services/api";

const MovieDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState("");

    const loadMovie = async () => {
        try {
            setLoading(true);
            setError("");
            const data = await apiService.getMovieById(id);
            setMovie(data);
        } catch (err) {
            console.error(err);
            setError("Failed to load movie details. The movie might not exist.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm(`Are you sure you want to permanently delete the movie: "${movie?.movieName}"?`)) return;
        try {
            setDeleting(true);
            await apiService.deleteMovie(id);
            // Navigate back to the movie list (presumably home page)
            navigate("/");
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.error || "Failed to delete movie.");
            setDeleting(false);
        }
    };

    useEffect(() => {
        loadMovie();
    }, [id]);

    // --- Loading State (Minimalist) ---
    if (loading) {
        return (
            <div className="py-16 flex flex-col items-center justify-center gap-3">
                <div
                    // MODIFIED: Elegant spinner color
                    className="h-8 w-8 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin"
                />
                <p
                    // MODIFIED: Clean text color
                    className="text-gray-500 text-sm font-medium"
                >
                    Loading movie details...
                </p>
            </div>
        );
    }

    // --- Not Found State (Minimalist) ---
    if (!movie) {
        return (
            <div className="py-16 text-center text-gray-600 text-base font-medium">
                ⚠️ Movie not found.
            </div>
        );
    }

    const posterUrl = apiService.buildPosterUrl(movie.moviePoster);

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-6">

            {/* --- Header and Action Buttons --- */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-200 pb-4">
                <div>
                    <h1
                        // MODIFIED: Elegant, prominent title
                        className="text-3xl font-bold text-gray-800"
                    >
                        {movie.movieName}
                    </h1>
                    <p
                        // MODIFIED: Clear, readable metadata
                        className="text-sm text-gray-500 mt-1"
                    >
                        {movie.movieYear && <span>{movie.movieYear}</span>}{" "}
                        {movie.isPublished === false && (
                            <span
                                // MODIFIED: Cleaner unpublished tag
                                className="ml-2 text-xs px-2 py-0.5 rounded-full bg-gray-200 text-gray-700 font-medium"
                            >
                                Unpublished
                            </span>
                        )}
                    </p>
                </div>

                <div className="flex gap-3">
                    <Link
                        to={`/movies/${movie._id}/edit`}
                        // MODIFIED: Secondary action button style
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white border border-gray-300 hover:bg-gray-100 text-sm font-medium text-gray-700 transition duration-150"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M12 20h9" />
                            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                        </svg>
                        <span>Edit</span>
                    </Link>

                    <button
                        type="button"
                        onClick={handleDelete}
                        disabled={deleting}
                        // MODIFIED: Destructive action button style
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-sm font-medium text-white transition duration-150 disabled:opacity-50"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M3 6h18" />
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                        </svg>
                        <span>{deleting ? "Deleting..." : "Delete"}</span>
                    </button>
                </div>
            </div>

            {/* --- Content: Poster and Info --- */}
            <div className="flex flex-col md:flex-row gap-8">
                {/* Poster Container */}
                <div
                    // MODIFIED: Clean container for poster
                    className="bg-gray-100 border border-gray-200 rounded-xl overflow-hidden shadow-md md:w-80 flex-shrink-0 aspect-2/3"
                >
                    {posterUrl ? (
                        <img
                            src={posterUrl}
                            alt={`Poster for ${movie.movieName}`}
                            className="w-full h-full object-cover object-center"
                        />
                    ) : (
                        <div className="h-full flex items-center justify-center text-gray-500 text-sm p-4">
                            🖼️ No poster uploaded
                        </div>
                    )}
                </div>

                {/* Info Card */}
                <div
                    // MODIFIED: Main info card container
                    className="bg-white border border-gray-200 rounded-xl p-6 space-y-5 flex-1 shadow-lg"
                >

                    {movie.movieDescription && (
                        <div>
                            <h2
                                // MODIFIED: Clear heading style
                                className="text-sm font-semibold text-gray-700 border-b border-gray-100 pb-1 mb-2"
                            >
                                Overview
                            </h2>
                            <p className="text-sm text-gray-600">
                                {movie.movieDescription}
                            </p>
                        </div>
                    )}

                    {movie.movieGenre && movie.movieGenre.length > 0 && (
                        <div>
                            <h2 className="text-sm font-semibold text-gray-700 border-b border-gray-100 pb-1 mb-2">
                                Genres
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {movie.movieGenre.map((genre) => (
                                    <span
                                        key={genre}
                                        // MODIFIED: Elegant genre tags
                                        className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-medium"
                                    >
                                        {genre.charAt(0).toUpperCase() + genre.slice(1)}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                        {/* Rating */}
                        {movie.rating !== undefined && (
                            <div>
                                <h2 className="text-xs font-semibold text-gray-500 mb-1">Rating</h2>
                                <p className="text-lg font-bold text-gray-800">
                                    ⭐ {movie.rating}<span className="text-sm font-normal text-gray-500">/10</span>
                                </p>
                            </div>
                        )}

                        {/* Duration */}
                        {movie.durationMinutes && (
                            <div>
                                <h2 className="text-xs font-semibold text-gray-500 mb-1">Duration</h2>
                                <p className="text-lg font-bold text-gray-800">
                                    ⏱️ {movie.durationMinutes} min
                                </p>
                            </div>
                        )}

                        {/* ID (Less prominent) */}
                        <div>
                            <h2 className="text-xs font-semibold text-gray-500 mb-1">Movie ID</h2>
                            <p className="text-sm text-gray-600 break-all">{movie.mId}</p>
                        </div>
                    </div>


                    {movie.languages && movie.languages.length > 0 && (
                        <div className="pt-4 border-t border-gray-100">
                            <h2 className="text-sm font-semibold text-gray-700 border-b border-gray-100 pb-1 mb-2">
                                Languages
                            </h2>
                            <p className="text-sm text-gray-600">
                                {movie.languages.map(lang => lang.charAt(0).toUpperCase() + lang.slice(1)).join(", ")}
                            </p>
                        </div>
                    )}

                    {movie.cast && movie.cast.length > 0 && (
                        <div>
                            <h2 className="text-sm font-semibold text-gray-700 border-b border-gray-100 pb-1 mb-2">
                                Cast
                            </h2>
                            <p className="text-sm text-gray-600">
                                {movie.cast.join(", ")}
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* --- Error Message Display --- */}
            {error && (
                <div
                    // MODIFIED: Visually cleaner error box
                    className="rounded-lg border border-red-400 bg-red-50 p-4 text-red-700 text-sm font-medium shadow-sm"
                    role="alert"
                >
                    <p>🚨 **Load/Deletion Error:** {error}</p>
                </div>
            )}
        </div>
    );
};

export default MovieDetailsPage;