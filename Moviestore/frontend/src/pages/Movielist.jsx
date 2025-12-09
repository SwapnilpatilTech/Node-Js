import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiService } from "../services/api";

const fallbackMovie = "https://via.placeholder.com/300x450/e5e7eb/4b5563?text=No+Poster"; // Lighter placeholder

// Normalize backend response into a plain array of movies
const normalizeMovies = (data) => {
    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data.data)) return data.data;
    if (data && Array.isArray(data.movies)) return data.movies;
    return null;
};

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [deletingId, setDeletingId] = useState(null);

    const fetchMovies = async (query = "") => {
        try {
            setLoading(true);
            setError("");

            const data = query
                ? await apiService.searchMovies(query)
                : await apiService.getMovies();

            const moviesArray = normalizeMovies(data);

            if (moviesArray) {
                setMovies(moviesArray);
            } else {
                console.log("Unexpected movies response:", data);
                setError("Invalid response from server.");
            }
        } catch (err) {
            console.error(err);
            setError(`Failed to ${query ? 'search for' : 'fetch'} movies.`);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchMovies(searchTerm.trim());
    };

    const handleClear = () => {
        setSearchTerm("");
        fetchMovies(); // Fetch all movies again
    };

    const handleDelete = async (e, id) => {
        e.preventDefault(); // Stop navigating to details page
        e.stopPropagation(); // Stop parent Link click

        if (!window.confirm("Are you sure you want to delete this movie?")) return;

        try {
            setDeletingId(id);
            await apiService.deleteMovie(id);
            // Optimistically update the UI
            setMovies(prevMovies => prevMovies.filter(movie => movie._id !== id));
        } catch (err) {
            console.error(err);
            setError("Failed to delete movie.");
        } finally {
            setDeletingId(null);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-8">
            {/* --- Header + Search Bar --- */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 border-b border-gray-200 pb-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">
                        Movie Catalog
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        View, search, or add movies to the collection.
                    </p>
                </div>

                <form
                    onSubmit={handleSearch}
                    className="w-full md:w-auto flex flex-col sm:flex-row gap-2 sm:items-center"
                >
                    <div className="relative flex-1 min-w-[220px]">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
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
                                <circle cx="11" cy="11" r="8" />
                                <path d="M21 21l-4.35-4.35" />
                            </svg>
                        </span>
                        <input
                            type="text"
                            placeholder="Search by title..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            // MODIFIED: Light, clean input style
                            className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm shadow-sm"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        // MODIFIED: Primary button style
                        className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 transition duration-150"
                    >
                        {loading ? "Searching..." : "Search"}
                    </button>

                    {searchTerm && (
                        <button
                            type="button"
                            onClick={handleClear}
                            // MODIFIED: Secondary/clear button style
                            className="px-3 py-2 rounded-lg bg-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-150"
                        >
                            Clear
                        </button>
                    )}

                    {/* Add Movie Button */}
                    <Link
                        to="/movies/add"
                        className="px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition duration-150 flex items-center gap-1"
                    >
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        Add Movie
                    </Link>
                </form>
            </div>

            {/* --- Error State (Minimalist) --- */}
            {error && (
                <div
                    className="mb-6 rounded-lg border border-red-400 bg-red-50 p-4 text-red-700 text-sm font-medium shadow-sm"
                    role="alert"
                >
                    <p>🚨 **Error:** {error}</p>
                </div>
            )}

            {/* --- Loading State (Minimalist) --- */}
            {loading && (
                <div className="py-10 flex flex-col items-center justify-center gap-3">
                    <div
                        className="h-8 w-8 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin"
                    />
                    <p className="text-gray-500 text-sm font-medium">Loading movies...</p>
                </div>
            )}

            {/* --- Movie Grid --- */}
            {!loading && movies.length > 0 && (
                <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {movies.map((movie) => {
                        const posterUrl = apiService.buildPosterUrl(movie.moviePoster);

                        return (
                            <Link
                                key={movie._id}
                                to={`/movies/${movie._id}`}
                                // MODIFIED: Clean card design
                                className="group relative bg-white border border-gray-200 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5 hover:border-indigo-400 duration-300"
                            >
                                {/* Poster Area */}
                                <div className="relative w-full aspect-[2/3] overflow-hidden bg-gray-100">
                                    <img
                                        src={posterUrl || fallbackMovie}
                                        alt={movie.movieName}
                                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                                        onError={(e) => {
                                            e.currentTarget.src = fallbackMovie;
                                        }}
                                    />

                                    {/* Top-right Rating badge */}
                                    {typeof movie.rating === "number" && (
                                        <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-indigo-600 shadow-md text-xs font-semibold text-white flex items-center gap-1">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-3 w-3 fill-current text-yellow-300"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M12 3l2.39 4.85L20 9.27l-3.8 3.7L17.48 19 12 16.27 6.52 19l1.28-6.03L4 9.27l5.61-1.42L12 3z" />
                                            </svg>
                                            <span>{movie.rating.toFixed ? movie.rating.toFixed(1) : movie.rating}</span>
                                        </div>
                                    )}

                                    {/* Top-left Publish Status */}
                                    <div className={`absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${movie.isPublished ? "bg-emerald-100 text-emerald-800" : "bg-gray-300 text-gray-700"}`}>
                                        {movie.isPublished ? "Published" : "Draft"}
                                    </div>
                                </div>

                                {/* Info Section */}
                                <div className="p-3 pt-2 flex flex-col gap-1">
                                    <h2 className="text-sm font-semibold text-gray-800 line-clamp-2">
                                        {movie.movieName}
                                    </h2>

                                    {/* Year and Duration (Less prominent) */}
                                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                                        {movie.movieYear && <span>{movie.movieYear}</span>}
                                        {movie.movieYear && movie.durationMinutes && <span className="text-gray-300">•</span>}
                                        {movie.durationMinutes && <span>{movie.durationMinutes} min</span>}
                                    </div>

                                    {/* Action buttons (Hidden until hover/focus, shown on link for usability) */}
                                    <div className="flex gap-2 pt-3">
                                        <Link
                                            to={`/movies/${movie._id}/edit`}
                                            onClick={(e) => e.stopPropagation()}
                                            // MODIFIED: Edit Button - secondary action color
                                            className="flex-1 inline-flex items-center justify-center px-2 py-1.5 rounded-lg bg-indigo-100 text-indigo-700 text-xs font-medium hover:bg-indigo-200 transition duration-150"
                                        >
                                            Edit
                                        </Link>

                                        <button
                                            onClick={(e) => handleDelete(e, movie._id)}
                                            disabled={deletingId === movie._id}
                                            // MODIFIED: Delete Button - destructive action color
                                            className="flex-1 inline-flex items-center justify-center px-2 py-1.5 rounded-lg bg-red-100 text-red-700 text-xs font-medium hover:bg-red-200 transition duration-150 disabled:opacity-50"
                                        >
                                            {deletingId === movie._id ? "..." : "Delete"}
                                        </button>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            )}

            {/* --- Empty State (Minimalist) --- */}
            {!loading && movies.length === 0 && !error && (
                <div className="py-10 text-center text-gray-500 text-base">
                    No movies found matching the criteria. Try adding one!
                </div>
            )}
        </div>
    );
};

export default MovieList;