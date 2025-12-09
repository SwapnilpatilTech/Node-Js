# MovieStore

A full-stack web application for managing and browsing a movie store. Built with Node.js/Express backend and React frontend.

## Features

- Browse movies
- Add new movies
- Edit existing movies
- View movie details
- Upload movie posters
- Responsive design
<img src="https://github.com/SwapnilpatilTech/Node-Js/blob/fccec037ce93092533b3c97cff5f47be362c76b3/Moviestore/frontend/src/assets/Screenshot%202025-12-09%20200836.png" width="100%" />
video : https://drive.google.com/file/d/15soOJB5mCp2cqiNHBaT4KkOWOmB0qVPn/view?usp=sharing
## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **Multer** - File upload middleware
- **CORS** - Cross-origin resource sharing

### Frontend
- **React** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd moviestore
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

4. Set up environment variables:

Create a `.env` file in the `backend` directory with the following variables:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/moviestore
```

## Usage

1. Start the backend server:
```bash
cd backend
npm run dev
```

2. Start the frontend development server:
```bash
cd frontend
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## API Endpoints

### Movies
- `GET /api/movies` - Get all movies
- `GET /api/movies/:id` - Get movie by ID
- `POST /api/movies` - Create new movie
- `PUT /api/movies/:id` - Update movie
- `DELETE /api/movies/:id` - Delete movie

## Project Structure

```
moviestore/
├── backend/
│   ├── configs/
│   │   └── db.js
│   ├── controllers/
│   │   └── movie.controller.js
│   ├── middleware/
│   │   └── upload.js
│   ├── models/
│   │   └── movie.model.js
│   ├── routers/
│   │   └── router.js
│   ├── uploads/
│   ├── utils/
│   │   └── toArray.js
│   ├── app.js
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   └── Movie.form.jsx
│   │   ├── pages/
│   │   │   ├── Addmovie.jsx
│   │   │   ├── Editmovie.jsx
│   │   │   ├── Moviedetail.jsx
│   │   │   └── Movielist.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.
