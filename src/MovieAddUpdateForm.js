import React, { useState, useEffect } from "react";
import axios from "axios";

const MovieAddUpdateForm = ({ movie, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    release_date: "",
    genre: "",
    poster_url: "",
  });

  useEffect(() => {
    if (movie) {
      setFormData({
        title: movie.title,
        description: movie.description,
        release_date: movie.release_date ? movie.release_date.slice(0, 10) : "",
        genre: movie.genre,
        poster_url: movie.poster_url,
      });
    }
  }, [movie]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        if(movie) {
            await axios.put(`http://localhost:4000/api/movies/${movie.id}`,formData)
        } else {
      await axios.post("http://localhost:4000/api/movies", formData);
        }
      onUpdate();
      setFormData({
        title: "",
        description: "",
        release_date: "",
        genre: "",
        poster_url: "",
      });
    } catch (error) {
      console.error("Error movie:", error);
    }
};

    const handleCancel = () => {
      oncancel();
      setFormData({
        title: "",
        description: "",
        release_date: "",
        genre: "",
        poster_url: "",
      });
    };
  

  return (
    <div>
      <h2>Add Movie</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="release_date">Release Date</label>
          <input
            type="date"
            name="release_date"
            id="release_date"
            value={formData.release_date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="genre">Genre</label>
          <input
            type="text"
            name="genre"
            id="genre"
            placeholder="e.g. Action, Comedy"
            value={formData.genre}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="poster_url">Poster URL</label>
          <input
            type="url"
            name="poster_url"
            id="poster_url"
            value={formData.poster_url}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
          <button type="submit">{movie ? "Update Movie" : "Add Movie"}</button>
        </div>
      </form>
    </div>
  );
};

export default MovieAddUpdateForm;
