import React from 'react'

import MovieItem from '../movie-item'
import { useGenres } from '../genres/genres'

function MovieList({ movies, onRatingChange }) {
  const genres = useGenres()
  // console.log('ratedMovies', ratedMovies)
  return (
    <div className="movie-list center">
      {movies.map((movie) => (
        <MovieItem
          key={movie.id}
          movie={movie}
          genres={genres}
          onRatingChange={onRatingChange}
          // rating={ratedMovies[movie.rating]}
        />
      ))}
    </div>
  )
}

export default MovieList
