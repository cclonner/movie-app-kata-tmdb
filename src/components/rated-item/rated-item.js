/* eslint-disable no-param-reassign */
import React, { useState, useEffect } from 'react'
import { Alert } from 'antd'

import MovieService from '../../services/API'
import MovieList from '../movie-list'

const api = new MovieService()

function RatedItem({ guestSessionId }) {
  const [currentRatedMovies, setRatedMovies] = useState([])
  useEffect(() => {
    const fetchRatedMovies = async () => {
      try {
        if (guestSessionId) {
          const ratedMoviesResult = await api.getRatedMovies(guestSessionId)
          setRatedMovies(ratedMoviesResult.results)
        } else {
          console.log('Гостевая сессия отсутствует.')
        }
      } catch (error) {
        console.log('Ошибка при получении оцененных фильмов:', error.message)
      }
    }

    fetchRatedMovies()
  }, [guestSessionId])

  return (
    <div>
      {currentRatedMovies.length > 0 ? (
        <MovieList movies={currentRatedMovies} />
      ) : (
        <Alert message="Ошибка загруки фильмов" description="У вас нет оцененных фильмов" type="info" showIcon />
      )}
    </div>
  )
}

export default RatedItem
