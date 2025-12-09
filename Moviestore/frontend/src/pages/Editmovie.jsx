// src/pages/EditMoviePage.jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MovieForm from "../components/Movie.form.jsx";
import { apiService } from "../services/api.js";

const EditMoviePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [initialData, setInitialData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    const loadMovie = async () => {
        try {
            setLoading(true);
            setError("");
            const data = await apiService.getMovieById(id);

            // Re-format data structure if necessary for the MovieForm's initialValues
            // Assuming your backend returns keys like movieName, movieYear, etc.
            setInitialData(data);
        } catch (err) {
            console.error(err);
            setError("Failed to load movie details. The movie might not exist.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadMovie();
    }, [id]);

    const handleSubmit = async (values) => {
        try {
            setSubmitting(true);
            setError("");
            // The apiService.updateMovie must handle FormData if 'values' contains a file
            await apiService.updateMovie(id, values);
            // Navigate to the movie details page after successful update
            navigate(`/movies/${id}`);
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.error || "Failed to update movie. Please check your inputs.");
        } finally {
            setSubmitting(false);
        }
    };

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
    if (!initialData) {
        return (
            <div className="py-16 text-center text-gray-600 text-base font-medium">
                ⚠️ Error: Movie not found or inaccessible.
            </div>
        );
    }

    return (
        // Wrapper for content padding and maximum width
        <div className="max-w-3xl mx-auto p-4 md:p-8 space-y-6">

            {/* Header Section */}
            <div>
                <h1
                    // MODIFIED: Elegant, readable header text
                    className="text-3xl font-bold text-gray-800 mb-1 border-b border-gray-200 pb-2"
                >
                    ✍️ Edit Movie
                </h1>
                <p
                    // MODIFIED: Clean, readable subtext
                    className="text-sm text-gray-500"
                >
                    Update the details for **{initialData.movieName || "this movie"}**.
                </p>
            </div>

            <hr className="border-t border-gray-100" />

            {/* Error Message Display (Minimalist) */}
            {error && (
                <div
                    // MODIFIED: Visually cleaner error box
                    className="rounded-lg border border-red-400 bg-red-50 p-4 text-red-700 text-sm font-medium shadow-sm"
                    role="alert"
                >
                    <p>🚨 **Update Error:** {error}</p>
                </div>
            )}

            {/* MovieForm Component - Uses the previously refined minimalist styling */}
            <MovieForm
                initialValues={initialData}
                onSubmit={handleSubmit}
                submitting={submitting}
            />
        </div>
    );
};

export default EditMoviePage;