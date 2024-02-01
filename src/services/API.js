/* eslint-disable no-param-reassign */
class MovieService {
  _apiBase = 'https://api.themoviedb.org/3'

  _apiKey = 'f62216fc1797365a85f9b0038a712ef9'

  _getOptions = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNjIyMTZmYzE3OTczNjVhODVmOWIwMDM4YTcxMmVmOSIsInN1YiI6IjY0ZDM3ZmViYjZjMjY0MTE1NWVmMGFmZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fyiVYv8ZHQjVRAaEh0OH2DLv1OJVLsisIAIDJQ1OdI0',
    },
  }

  getResource = async (url) => {
    const response = await fetch(this._apiBase + url, this._getOptions)
    const body = await response.json()

    if (body.success === false) {
      throw new Error(body.status_message)
    } else {
      return body
    }
  }

  async getByKeyword(keyword, page = 1) {
    return this.getResource(`/search/movie?query=${keyword}&language=en-US&page=${page}`)
  }

  getMovie(id) {
    return this.getResource(`/movie/${id}`)
  }

  getTranding = (page) => {
    const intPage = parseInt(page, 10)
    return this.getResource(`/trending/movie/day?language=en-US&page=${intPage}`)
  }

  createGuestSession = async () => {
    const responce = await fetch(`${this._apiBase}/authentication/guest_session/new`, this._getOptions)
    const body = await responce.json()
    if (!body.success) {
      throw new Error(body.status_message)
    } else {
      return body.guest_session_id
    }
  }

  setMovieRate = async (filmId, guestSessionId, rateValue) => {
    const responce = await fetch(
      `${this._apiBase}/movie/${filmId}/rating?guest_session_id=${guestSessionId}&api_key=${this._apiKey}`,
      {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: `{"value":${rateValue}}`,
      }
    )
    const body = await responce.json()
    if (!body.success) {
      throw new Error(body.status_message)
    } else {
      return body
    }
  }

  getRatedMovies = async (sessionId, page = 1) => {
    const responce = await fetch(
      `${this._apiBase}/guest_session/${sessionId}/rated/movies?language=en-US&page=${page}&api_key=${this._apiKey}`
    )
    const body = await responce.json()
    if (body.success === false) {
      throw new Error(body.status_message)
    } else {
      return body
    }
  }

  getGenreList = async () => {
    const responce = await fetch(`${this._apiBase}/genre/movie/list?language=en`, this._getOptions)
    const body = await responce.json()
    if (body.success === false) {
      throw new Error(body.status_message)
    } else {
      return body.genres
    }
  }
}

export default MovieService

// const movieService = new MovieService()
// const movies = await movieService.getByKeyword('Napoleon', 1)
// const genre = await movieService.getGenreList()
// console.log('genres:', genre)
// console.log('movie:', movies)
// объект названий жанров по их id
// const genreMap = genre.reduce((map, g) => {
//   map[g.id] = g.name
//   return map
// }, {})
// console.log('genreMap:', genreMap)

// movies.results.forEach((movie) => {
//   movie.genre_names = movie.genre_ids.map((id) => genreMap[id])
// })
