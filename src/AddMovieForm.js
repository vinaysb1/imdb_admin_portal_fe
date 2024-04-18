import React, { useState } from 'react'
import axios from 'axios';


const AddMovieForm = ({ onAdd }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        release_date: '',
        genre: '',
        poster_url: '',
    });

    const handleChange = (e) => {        
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        });
    }

    handleSubmit = async (e) => {
        e.preventdefault()
        try{
            await axios.post('http:localhost:4000/api/movies',formData)
            onAdd();
            setFormData({
                title: '',
                description: '',
                release_date: '',
                genre: '',
                poster_url: '',
            })
        }catch(error) {
            console.error('error adding movie',error)
        }
    };

  return (
    <div>
      <h2> Add Movie</h2>
      <form onSubmit={handleSubmit}>
        <div>
        <label htmlFor='title'>Title</label>
        <input type='text'  name='title' id='text' value={formData.title} onChange={handleChange}/>
        </div>
        <div>
            <label htmlFor='description'>Description</label>
            <input type='description'  name='description' value={formData.description} onChange={handleChange} />
        </div>
        <div>
            <label htmlFor='release_date'>Release date</label>
            <input type='date' name='drelease_date' value={formData.release_date} onChange={handleChange} />
        </div>
        <div>
            <label htmlFor='genre'>Genre</label>
            <input type='text' name="genre" value={formData.genre} onChange={handleChange} />
        </div>
        <div>
            <label htmlFor='poster_url'>Poster URL</label>
            <input type='url' name="poster_url" value={formData.poster_url} onChange={handleChange} />
        </div>
        <button type='submit'>Add Movie</button>

      </form>
    </div>
  );
};

export default AddMovieForm;


