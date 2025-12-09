import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MovieForm from "../components/Movie.form.jsx";
import { apiService } from "../services/api.js";

const AddMoviePage = () => {
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (values) => {
        try {
            setSubmitting(true);
            setError("");

            // The apiService.addMovie must handle FormData creation if 'values' contains a file (moviePoster)
            await apiService.addMovie(values);
            navigate("/");
        } catch (err) {
            console.error(err);
            // Assuming error structure from API response
            setError(err.response?.data?.error || "Failed to add movie. Please check your inputs.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        // Wrapper for content padding and maximum width
        <div className="max-w-3xl mx-auto p-4 md:p-8 space-y-6">

            {/* Header Section */}
            <div>
                <h1
                    // MODIFIED: Elegant, readable header text
                    className="text-3xl font-bold text-gray-800 mb-1 border-b border-gray-200 pb-2"
                >
                    🎬 Add New Movie
                </h1>
                <p
                    // MODIFIED: Clean, readable subtext
                    className="text-sm text-gray-500"
                >
                    Enter the comprehensive details for the movie record.
                </p>
            </div>

            <hr className="border-t border-gray-100" />

            {/* Error Message Display */}
            {error && (
                <div
                    // MODIFIED: Visually cleaner error box
                    className="rounded-lg border border-red-400 bg-red-50 p-4 text-red-700 text-sm font-medium shadow-sm"
                    role="alert"
                >
                    <p>🚨 **Submission Error:** {error}</p>
                </div>
            )}

            {/* MovieForm Component */}
            {/* The MovieForm component already includes the beautiful minimalist design */}
            <MovieForm onSubmit={handleSubmit} submitting={submitting} />

        </div>
    );
};

export default AddMoviePage;