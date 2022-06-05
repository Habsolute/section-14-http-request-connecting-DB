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
      // let url = "https://swapi.dev/api/films/";

      let firebaseUrl =
        "https://react-http-testing-1d3bc-default-rtdb.firebaseio.com/movies.json";

      const resp = await fetch(firebaseUrl);

      if (!resp.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await resp.json();

      const loadedMovies = [];

      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
      }

      // const transformedMovies = data.results.map((movieData) => {
      //   return {
      //     id: movieData.episode_id,
      //     title: movieData.title,
      //     openingText: movieData.opening_crawl,
      //     releaseDate: movieData.releade_date,
      //   };
      // });
      setMovieList(loadedMovies);
      setIsLoading(false);
      console.log(loadedMovies);
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

  async function addMovieHandler(movie) {
    console.log(movie);
    const resp = await fetch(
      "https://react-http-testing-1d3bc-default-rtdb.firebaseio.com/movies.json",
      {
        method: "POST",
        body: JSON.stringify(movie),
        headers: {
          "content-type": "application/json",
        },
      }
    );
    const data = await resp.json();
    console.log(data);
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
