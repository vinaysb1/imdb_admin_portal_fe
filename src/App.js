import React, { useState, useEffect } from 'react';
import MovieAddUpdateForm from './MovieAddUpdateForm';
import axios from 'axios';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [updateMovie, setUpdateMovie] = useState(null);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/movies');
      setMovies(response.data.movies);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const handleAddOrUpdateMovie = async () => {
    setUpdateMovie(null);
    await fetchMovies();
  };

  const handleCancel = () => {
    setUpdateMovie(null);
  };

  const handleDeleteMovie = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/movies/${id}`);
      await fetchMovies();
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
  };

  return (
    <div className="container">
      <h1>Movies</h1>
      <MovieAddUpdateForm movie={updateMovie} onUpdate={handleAddOrUpdateMovie} onCancel={handleCancel} />
      <div className="mt-4">
        {movies.map((movie) => (
          <div key={movie.id} className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">{movie.title}</h5>
              <p className="card-text">{movie.description}</p>
              <div className="d-flex justify-content-between">
                <button className="btn btn-primary" onClick={() => setUpdateMovie(movie)}>Update</button>
                <button className="btn btn-danger" onClick={() => handleDeleteMovie(movie.id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
