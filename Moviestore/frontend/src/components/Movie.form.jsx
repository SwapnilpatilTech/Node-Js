import { useState } from "react";

const GENRES = [
    "action",
    "adventure",
    "animation",
    "biography",
    "comedy",
    "crime",
    "documentary",
    "drama",
    "family",
    "fantasy",
    "horror",
    "mystery",
    "romance",
    "sci-fi",
    "thriller",
    "war",
    "western",
];

const initialErrors = {
    movieName: "",
    movieYear: "",
    mId: "",
};

// ... (Your validate function remains unchanged)
const validate = (values) => {
    const errors = { ...initialErrors };

    if (!values.mId || !values.mId.trim()) {
        errors.mId = "Movie ID is required.";
    }

    if (!values.movieName || !values.movieName.trim()) {
        errors.movieName = "Movie title is required.";
    } else if (values.movieName.trim().length < 2) {
        errors.movieName = "Title must be at least 2 characters.";
    }

    if (values.movieYear) {
        const yearNum = Number(values.movieYear);
        if (Number.isNaN(yearNum)) {
            errors.movieYear = "Year must be a number.";
        } else if (yearNum < 1888) {
            errors.movieYear = "Year cannot be before 1888.";
        } else if (yearNum > new Date().getFullYear() + 1) {
            errors.movieYear = "Year is too far in the future.";
        }
    }

    return errors;
};

const MovieForm = ({ initialValues, onSubmit, submitting = false }) => {
    const [values, setValues] = useState({
        mId: initialValues?.mId || "",
        movieName: initialValues?.movieName || "",
        movieDescription: initialValues?.movieDescription || "",
        movieGenre: initialValues?.movieGenre || [],
        movieYear: initialValues?.movieYear || "",
        durationMinutes: initialValues?.durationMinutes || "",
        rating: initialValues?.rating ?? "",
        languages: initialValues?.languages?.join(", ") || "",
        cast: initialValues?.cast?.join(", ") || "",
        isPublished: initialValues?.isPublished ?? true,
        moviePoster: null,
    });

    const [errors, setErrors] = useState(initialErrors);

    const handleChange = (field, value) => {
        setValues((prev) => ({ ...prev, [field]: value }));
    };

    const handleGenreToggle = (genre) => {
        setValues((prev) => {
            const exists = prev.movieGenre.includes(genre);
            return {
                ...prev,
                movieGenre: exists
                    ? prev.movieGenre.filter((g) => g !== genre)
                    : [...prev.movieGenre, genre],
            };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate(values);
        setErrors(validationErrors);

        const hasError = Object.values(validationErrors).some(Boolean);
        if (hasError) return;

        const payload = {
            ...values,
            languages: values.languages
                ? values.languages
                    .split(",")
                    .map((l) => l.trim())
                    .filter(Boolean)
                : [],
            cast: values.cast
                ? values.cast
                    .split(",")
                    .map((c) => c.trim())
                    .filter(Boolean)
                : [],
        };

        onSubmit(payload);
    };

    return (
        <form
            onSubmit={handleSubmit}
            // MODIFIED: Lighter background, subtle border, rounded corners
            className="space-y-6 bg-white shadow-xl rounded-xl p-6 md:p-8 max-w-2xl mx-auto"
        >
            <h2 className="text-2xl font-semibold text-gray-800 border-b pb-3 mb-4">
                Movie Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {/* Movie ID */}
                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">
                        Movie ID
                    </label>
                    <input
                        type="text"
                        value={values.mId}
                        onChange={(e) => handleChange("mId", e.target.value)}
                        // MODIFIED: Clean, white/light background input
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-gray-50 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150"
                    />
                    {errors.mId && (
                        <p className="mt-1 text-xs text-red-500">{errors.mId}</p>
                    )}
                </div>

                {/* Title */}
                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">
                        Title
                    </label>
                    <input
                        type="text"
                        value={values.movieName}
                        onChange={(e) => handleChange("movieName", e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-gray-50 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150"
                    />
                    {errors.movieName && (
                        <p className="mt-1 text-xs text-red-500">{errors.movieName}</p>
                    )}
                </div>

                {/* Year */}
                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">
                        Release Year
                    </label>
                    <input
                        type="number"
                        value={values.movieYear}
                        onChange={(e) => handleChange("movieYear", e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-gray-50 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150"
                    />
                    {errors.movieYear && (
                        <p className="mt-1 text-xs text-red-500">{errors.movieYear}</p>
                    )}
                </div>

                {/* Duration */}
                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">
                        Duration (minutes)
                    </label>
                    <input
                        type="number"
                        value={values.durationMinutes}
                        onChange={(e) => handleChange("durationMinutes", e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-gray-50 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150"
                    />
                </div>

                {/* Rating */}
                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">
                        Rating (0–10)
                    </label>
                    <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="10"
                        value={values.rating}
                        onChange={(e) => handleChange("rating", e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-gray-50 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150"
                    />
                </div>

                {/* Languages */}
                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">
                        Languages (comma separated)
                    </label>
                    <input
                        type="text"
                        value={values.languages}
                        onChange={(e) => handleChange("languages", e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-gray-50 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150"
                    />
                </div>

                {/* Cast */}
                <div className="md:col-span-2">
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">
                        Cast (comma separated)
                    </label>
                    <input
                        type="text"
                        value={values.cast}
                        onChange={(e) => handleChange("cast", e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-gray-50 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150"
                    />
                </div>
            </div>

            {/* Description */}
            <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">
                    Description
                </label>
                <textarea
                    rows={3}
                    value={values.movieDescription}
                    onChange={(e) => handleChange("movieDescription", e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-gray-50 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none transition duration-150"
                />
            </div>

            {/* Genres */}
            <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">
                    Genres
                </label>
                <div className="flex flex-wrap gap-2">
                    {GENRES.map((genre) => {
                        const active = values.movieGenre.includes(genre);
                        return (
                            <button
                                type="button"
                                key={genre}
                                onClick={() => handleGenreToggle(genre)}
                                // MODIFIED: Lighter, minimalist genre buttons
                                className={`px-3 py-1 rounded-full text-xs font-medium border transition duration-150 ${active
                                    ? "bg-indigo-500 text-white border-indigo-500 shadow-md"
                                    : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
                                    }`}
                            >
                                {genre}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Published + Poster */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 items-center pt-2 border-t border-gray-200">
                <div className="flex items-center gap-3">
                    <label className="text-xs font-medium text-gray-600">
                        Published Status
                    </label>
                    <button
                        type="button"
                        onClick={() =>
                            handleChange("isPublished", !values.isPublished)
                        }
                        // MODIFIED: Cleaner toggle button
                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium transition duration-150 ${values.isPublished
                            ? "bg-emerald-500 text-white border-emerald-500"
                            : "bg-gray-200 text-gray-700 border-gray-300 hover:bg-gray-300"
                            }`}
                    >
                        <span
                            className={`h-2 w-2 rounded-full ${values.isPublished ? "bg-white" : "bg-gray-500"
                                }`}
                        />
                        <span>{values.isPublished ? "Published" : "Unpublished"}</span>
                    </button>
                </div>

                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">
                        Movie Poster
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                            handleChange("moviePoster", e.target.files?.[0] || null)
                        }
                        // MODIFIED: Cleaner file input styling
                        className="w-full text-sm text-gray-600 file:mr-3 file:px-3 file:py-1.5 file:rounded-lg file:border-0 file:bg-indigo-500 file:text-white file:text-sm file:font-medium hover:file:bg-indigo-600"
                    />
                </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                    type="submit"
                    disabled={submitting}
                    // MODIFIED: Primary button style
                    className="inline-flex items-center gap-2 px-6 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
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
                        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                        <polyline points="17 21 17 13 7 13 7 21" />
                        <polyline points="7 3 7 8 15 8" />
                    </svg>
                    <span>{submitting ? "Saving..." : "Save Movie"}</span>
                </button>
            </div>
        </form>
    );
};

export default MovieForm;