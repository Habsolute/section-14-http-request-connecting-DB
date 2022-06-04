import React, { useState, useEffect, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import AddMovie from "./components/AddMovie";

function App() {
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // const dummyMovies = [
  //   {
  //     id: 1,
  //     title: "Some Dummy Movie",
  //     openingText: "This is the opening text of the movie",
  //     releaseDate: "2021-05-18",
  //   },
  //   {
  //     id: 2,
  //     title: "Some Dummy Movie 2",
  //     openingText: "This is the second opening text of the movie",
  //     releaseDate: "2021-05-19",
  //   },
  // ];

  /**
   * how to fetch api by URL whit GET method
   */
  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      let url = "https://swapi.dev/api/films/";

      const resp = await fetch(url);

      if (!resp.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await resp.json();

      const transformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.releade_date,
        };
      });
      setMovieList(transformedMovies);
      setIsLoading(false);
      console.log(transformedMovies);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  }, []);

  /**
   * fetch API whitout useEffect()
   */
  // async function fetchMoviesHandler() {
  //   setIsLoading(true);
  //   setError(null);
  //   try {
  //     let url = "https://swapi.dev/api/films/";

  //     const resp = await fetch(url);

  //     if (!resp.ok) {
  //       throw new Error("Something went wrong!");
  //     }
  //     const data = await resp.json();

  //     const transformedMovies = data.results.map((movieData) => {
  //       return {
  //         id: movieData.episode_id,
  //         title: movieData.title,
  //         openingText: movieData.opening_crawl,
  //         releaseDate: movieData.releade_date,
  //       };
  //     });
  //     setMovieList(transformedMovies);
  //     setIsLoading(false);
  //     console.log(transformedMovies);
  //   } catch (error) {
  //     setIsLoading(false);
  //     setError(error.message);
  //   }
  // }

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  function addMovieHandler(movie) {
    console.log(movie);
  }

  let content = <p>Found no movies.</p>;

  if (movieList.length > 0) {
    content = <MoviesList movies={movieList} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {/* whit if statement */}
        {content}

        {/* whitout if statement  */}
        {/* {!isLoading && movieList.length > 0 && (
          <MoviesList movies={movieList} />
        )}
        {!isLoading && movieList.length === 0 && !error && (
          <p>Found no movies.</p>
        )}
        {!isLoading && error && <p>{error}</p>}
        {isLoading && <p>Loading...</p>} */}
      </section>
    </React.Fragment>
  );
}

export default App;
