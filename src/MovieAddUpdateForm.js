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
    <div className="card mb-4">
      <div className="card-body">
        <h2 className="card-title">Add Movie</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              name="title"
              id="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              className="form-control"
              name="description"
              id="description"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="release_date">Release Date</label>
            <input
              type="date"
              className="form-control"
              name="release_date"
              id="release_date"
              value={formData.release_date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="genre">Genre</label>
            <input
              type="text"
              className="form-control"
              name="genre"
              id="genre"
              placeholder="e.g. Action, Comedy"
              value={formData.genre}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="poster_url">Poster URL</label>
            <input
              type="url"
              className="form-control"
              name="poster_url"
              id="poster_url"
              value={formData.poster_url}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <button type="button" className="btn btn-secondary mr-2" onClick={handleCancel}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">{movie ? "Update Movie" : "Add Movie"}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MovieAddUpdateForm;
