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


  const handleDeleteMovie = async(id) => {
    try{
      await axios.delete(`http://localhost:4000/api/movies/${id}`);
      await fetchMovies();
    }catch(error) {
      console.error('error deleting movie:',error)
    }
  };

  return (
    <div >
      <h1 >Movies</h1>
      <MovieAddUpdateForm movie={updateMovie} onUpdate={handleAddOrUpdateMovie} onCancel={handleCancel} />
      <div className="mt-8">
        {movies.map((movie) => (
          <div key={movie.id}>
            <h2>{movie.title}</h2>
            <p >{movie.description}</p>
            <div >
              <button onClick={() => setUpdateMovie(movie)}>Update</button>
              <button onClick={() => handleDeleteMovie(movie.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
