/* eslint-disable no-param-reassign */
import React, { useState, useEffect } from 'react'

import MovieService from '../../services/API'
import MovieList from '../movie-list'

const api = new MovieService()

function RatedItem({ guestSessionId }) {
  const [currentRatedMovies, setRatedMovies] = useState([])
  console.log(currentRatedMovies)

  useEffect(() => {
    const fetchRatedMovies = async () => {
      try {
        if (guestSessionId) {
          const ratedMoviesResult = await api.getRatedMovies(guestSessionId)
          setRatedMovies(ratedMoviesResult.results)
          console.log('принял', ratedMoviesResult)
        } else {
          console.log('Гостевая сессия отсутствует.')
        }
      } catch (error) {
        console.log('Ошибка при получении оцененных фильмов:', error.message)
      }
    }

    fetchRatedMovies()
  }, [guestSessionId])

  // const ratedMovies = currentRatedMovies.reduce((map, movie) => {
  //   if (movie && movie.id && movie.rating) {
  //     map[movie.id] = movie.rating
  //   }
  //   return map
  // }, {})
  // console.log(ratedMovies)

  return (
    <div>
      <h2>Оцененные фильмы</h2>
      {currentRatedMovies.length > 0 ? <MovieList movies={currentRatedMovies} /> : <p>У вас нет оцененных фильмов</p>}
    </div>
  )
}

export default RatedItem
