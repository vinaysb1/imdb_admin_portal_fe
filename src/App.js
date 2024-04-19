import React, { useEffect, useState } from 'react'
import MovieAddUpdateForm from './MovieAddUpdateForm';
import axios from 'axios';


const App = () => {
const [movies,setMovies] = useState ([]);
const [updateMovie,setUpdateMovie] = useState(null)

useEffect(()=> {
  fetchMovies();
}, [])

 const fetchMovies = async () =>{
  try{
    const response = await axios.get('http://localhost:4000/api/movies');
      setMovies(response.data.movies);
     }catch(error) {
      console.error('error fetching movie:',error)
     }
}

const handleAddorUpdateMovie = async() => {
 setUpdateMovie(null);
 await fetchMovies();
}

const handleCancel = () => {
  setUpdateMovie(null);
};

  return (
    <div>
      <h1>Movies</h1>
      <MovieAddUpdateForm  movie={updateMovie} onUpdate={handleAddorUpdateMovie} onCancel={handleCancel}/>
      <div>
        {movies.map((movie)=>(
          <div key = {movie.id}>
            <h2>{movie.title}</h2>
            <p>{movie.description}</p>
            <button onClick={()=>setUpdateMovie(movie)}>Update</button>
            </div>
        ))}
      </div>
    </div>
  )
}

export default App
