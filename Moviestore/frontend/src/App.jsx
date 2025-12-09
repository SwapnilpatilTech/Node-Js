// src/App.jsx
import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";
import MovieList from "./pages/Movielist";
import AddMoviePage from "./pages/Addmovie";
import EditMoviePage from "./pages/Editmovie";
import MovieDetailsPage from "./pages/Moviedetail";

const App = () => {
  return (
    <BrowserRouter>
      {/* MODIFIED: Overall application background changed to light gray/white */}
      <div className="min-h-screen bg-gray-50 text-gray-800">
        <main className="max-w-6xl mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<MovieList />} />
            <Route path="/movies/add" element={<AddMoviePage />} />
            <Route path="/movies/:id/edit" element={<EditMoviePage />} />
            <Route path="/movies/:id" element={<MovieDetailsPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;