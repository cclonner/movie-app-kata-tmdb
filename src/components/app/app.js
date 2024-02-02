/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from 'react'
import { Layout, Pagination, Input, Tabs, Spin, Alert } from 'antd'
import debounce from 'lodash/debounce'

import MovieService from '../../services/API'
import MovieList from '../movie-list'
import RatedItem from '../rated-item'
import { GenresProvider } from '../genres/genres'

const { Content } = Layout
const api = new MovieService()

function App() {
  const [movies, setMovies] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')
  const [genres, setGenres] = useState([])
  const [guestSessionId, setGuestSessionId] = useState('')
  const [activeTab, setActiveTab] = useState('search')
  const [loading, setLoading] = useState(true)
  const [showAlert, setShowAlert] = useState(false)

  const tabs = [
    {
      key: 'search',
      label: 'Search',
    },
    {
      key: 'rated',
      label: 'Rated',
    },
  ]

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const genreList = await api.getGenreList()
        setGenres(genreList)
      } catch (error) {
        console.log('Ошибка в получении жанров:', error.message)
      }
    }

    const createGuestSession = async () => {
      try {
        const sessionId = await api.createGuestSession()
        setGuestSessionId(sessionId)
      } catch (error) {
        console.log('Ошибка при создании гостевой сессии:', error.message)
      }
    }

    fetchGenres()
    createGuestSession()
  }, [])

  const loadMovies = async (term, page) => {
    try {
      setLoading(false)
      const movieResults = term ? await api.getByKeyword(term, page) : await api.getTranding(page)

      setMovies(movieResults.results)
      setTotalResults(movieResults.total_results)
      setCurrentPage(page)
    } catch (error) {
      setShowAlert(true)
      console.log('Ошибка в получении фильмов:', error.message)
    }
  }

  const debouncedSearch = useCallback(
    debounce(async (term, page) => {
      loadMovies(term, page)
    }, 400),
    [loadMovies]
  )

  const handleSearch = (value) => {
    setSearchTerm(value)
    debouncedSearch(value, currentPage)
  }

  const handlePageChange = (page) => {
    loadMovies(searchTerm, page)
  }

  const handleRatingChange = ({ movieId, rating }) => {
    try {
      api.setMovieRate(movieId, guestSessionId, rating)
    } catch (error) {
      console.log('Ошибка при установке рейтинга фильма:', error.message)
    }
  }

  const onTabClick = (key) => {
    setActiveTab(key)
  }

  useEffect(() => {
    loadMovies(searchTerm, currentPage)
  }, [currentPage, searchTerm])

  return (
    <GenresProvider genres={genres}>
      <Layout className="layout">
        <Tabs
          items={tabs}
          activeKey={activeTab}
          onChange={onTabClick}
          centered
          style={{ width: '100%', textAlign: 'center' }}
        />
        <Content className="content center">
          <Spin spinning={loading}>
            <Input
              className="search-panel"
              placeholder="Введите название..."
              onPressEnter={handleSearch}
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
            />
            {activeTab === 'search' ? (
              <>
                {movies.length > 0 ? (
                  <MovieList movies={movies} genres={genres} onRatingChange={handleRatingChange} />
                ) : (
                  <Alert
                    message="У вас нет оцененных фильмов"
                    description="Пожалуйста, оцените фильмы, чтобы они появились в этом разделе."
                    type="info"
                    showIcon
                  />
                )}
                {totalResults > 20 && (
                  <Pagination
                    className="pagination"
                    current={currentPage}
                    total={totalResults > 400 ? totalResults / 2 : totalResults}
                    pageSize={20}
                    onChange={handlePageChange}
                    showSizeChanger={false}
                  />
                )}
              </>
            ) : (
              <RatedItem guestSessionId={guestSessionId} />
            )}
          </Spin>
        </Content>
      </Layout>
    </GenresProvider>
  )
}

export default App
