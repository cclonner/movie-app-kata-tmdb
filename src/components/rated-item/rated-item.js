/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { Alert } from 'antd'

import MovieService from '../../services/API'
import MovieList from '../movie-list'

const api = new MovieService()

function RatedItem({ guestSessionId }) {
  const [currentRatedMovies, setRatedMovies] = useState([])
  const [showAlert, setShowAlert] = useState(false)
  useEffect(() => {
    const fetchRatedMovies = async () => {
      try {
        if (guestSessionId) {
          const ratedMoviesResult = await api.getRatedMovies(guestSessionId)
          setRatedMovies(ratedMoviesResult.results)
          console.log('принял', ratedMoviesResult)
          if (ratedMoviesResult.results.length === 0) {
            setShowAlert(true)
          } else {
            setShowAlert(false)
          }
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
      <h2>Оцененные фильмы</h2>
      {showAlert && (
        <Alert
          message="У вас нет оцененных фильмов"
          description="Пожалуйста, оцените фильмы, чтобы они появились в этом разделе."
          type="info"
          showIcon
        />
      )}
      {currentRatedMovies.length > 0 ? (
        <MovieList movies={currentRatedMovies} />
      ) : (
        showAlert || <p>У вас нет оцененных фильмов</p>
      )}
    </div>
  )
}

export default RatedItem
