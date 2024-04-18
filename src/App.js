import React, { useEffect, useState } from 'react'
import AddMovieForm from './AddMovieForm';
import axios from 'axios';


const App = () => {
const [movies,setMovies] = useState ([]);
useEffect(()=> {
  fetchMovies();
}, [])

fetchMovies = async () =>{
  try{
    await axios.get('http://localhost:4000/api/movies')
    setMovies(response.data.movies);
     }catch(error) {
      console.error('error fetching movie:',error)
     }
}

const handleAddMovie = async() => {
 await fetchMovies();
}

  return (
    <div>
      <h1>Movies</h1>
      <AddMovieForm onAdd={handleAddMovie}/>
      <div>
        {movies.map((movie)=>(
          <div key = {movie.id}>
            <h2>{movie.title}</h2>
            <p>{movie.description}</p>
            </div>
        ))}
      </div>
    </div>
  )
}

export default App
