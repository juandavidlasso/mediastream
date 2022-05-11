/* eslint-disable react-hooks/exhaustive-deps */
/**
 * Exercise 02: Movie Library
 * We are trying to make a movie library for internal users. We are facing some issues by creating this, try to help us following the next steps:
 * !IMPORTANT: Make sure to run yarn movie-api for this exercise
 * 1. We have an issue fetching the list of movies, check why and fix it (handleMovieFetch)
 * 2. Create a filter by fetching the list of gender (http://localhost:3001/genres) and then loading
 * list of movies that belong to that gender (Filter all movies).
 * 3. Order the movies by year and implement a button that switch between ascending and descending order for the list
 * 4. Try to recreate the user interface that comes with the exercise (exercise02.png)
 * 
 * You can modify all the code, this component isn't well designed intentionally. You can redesign it as you need.
 */

import "./assets/styles.css";
import { useEffect, useState, useCallback } from "react";

export default function Exercise02 () {
  const [movies, setMovies] = useState([])
  const [fetchCount, setFetchCount] = useState(0)
  const [gender, setGender] = useState([])
  const [loading, setLoading] = useState(false)
  const [find, setFind] = useState()
  const newMovies = []

  const handleMovieFetch = () => {
    setLoading(true)
    setFetchCount(fetchCount + 1)
    fetch('db.json').then(res => res.json()).then(res => {
      setMovies([res])
      setGender(res.genres)
      setLoading(false)
    }).catch(() => {
      console.log('Run yarn movie-api for fake api')
    })
  }

  useEffect(() => {
    handleMovieFetch()
  }, [])

  const filtrarGender = useCallback(() => {
    return movies.map( (mv) => {
      const {movies} = mv
      return movies.map( (filter) => {
        const {genres} = filter
        return genres.map( (gen) => {
          if(gen === find) {
            newMovies.push(filter);
          }
        })
      })
    })
  }, [find])

  filtrarGender();

  return (
    <section className="movie-library">
      <h1 className="movie-library__title">
        Movie Library
      </h1>
      <div className="movie-library__actions">
        <select name="genre" placeholder="Search by genre..." value={find} onChange={(e) => setFind(e.target.value)}>
          {gender.map( (gend) => (
            <option key={gend} value={gend}>{gend}</option>
          ))}
        </select>
        <button type="button">Order Descending</button>
        <button type="button">Order Ascending</button>
      </div>
      {loading ? (
        <div className="movie-library__loading">
          <p>Loading...</p>
          <p>Fetched {fetchCount} times</p>
        </div>
      ) : (
        <ul className="movie-library__list">
          {newMovies.length === 0 ?
            movies.map(movie => {
              const {movies} = movie
              return movies.map( (mv) => (
                <li key={mv.id} className="movie-library__card">
                  <img src={mv.posterUrl} alt={movie.title} />
                  <ul>
                    <li style={{fontWeight: 'bold'}}>{mv.title}</li>
                    <li>{mv.genres.join(', ')}</li>
                    <li>{mv.year}</li>
                  </ul>
                </li>
              ))
            })
          :
            newMovies.map( (newMv) => {
              const {id,posterUrl,title,genres,year} = newMv
              return (
                <li key={id} className="movie-library__card">
                  <img src={posterUrl} alt={title} />
                  <ul>
                    <li style={{fontWeight: 'bold'}}>{title}</li>
                    <li>{genres.join(', ')}</li>
                    <li>{year}</li>
                  </ul>
                </li>
              )
            })
          }
        </ul>
      )}
    </section>
  )
}