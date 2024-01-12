import { useEffect, useState } from "react"
import "./App.css"
import SearchIcon from './search.svg'
import { Card } from './components/card'

const API_URL = 'http://www.omdbapi.com?apikey=b6003d8a'
// const API_URL = 'http://www.omdbapi.com/?i=tt3896198&apikey=fdef0f2b'

export const App = () => {
  const [movies, setMovies] = useState([])
  const [search, setSearch] = useState('')

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`)
    const data = await response.json()
    console.log(data.Search)
    setMovies(data.Search)
  }

  useEffect(() => {
    searchMovies(search)
  }, [search])

  useEffect(() => {
    searchMovies('hero')
  }, [])


  return (
    <div className="app">
      <h1>Movie Search</h1>
      <div className="search">
        <input type="text" placeholder="Search for movies"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <img src={SearchIcon} alt="Search" onClick={() => { searchMovies(search) }} />

      </div>
      {
        movies?.length > 0 ? (
          <div className="container">
            {
              movies.map((movie) => (
                <Card movie={movie} />
              ))
            }
          </div>
        ) : (
          <div className="empty">
            {
              search ?
                <h2>No movies found</h2>
                :
                <h2>Not searching for any movie</h2>
            }
          </div>
        )
      }
    </div>
  )
}