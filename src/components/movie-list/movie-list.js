import React from 'react'

import MovieItem from '../movie-item'

function MovieList({ movies, genres, onRatingChange }) {
  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <MovieItem key={movie.id} movie={movie} genres={genres} onRatingChange={onRatingChange} />
      ))}
    </div>
  )
}

export default MovieList
