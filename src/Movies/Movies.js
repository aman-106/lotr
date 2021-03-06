import React, { useState, useEffect, useMemo } from "react";
import axios from "../AxiosInstance";
import Loader from "../Loader";
import "./styles.css";

const emptyMoviesList = [];
// show list of movies and sort the movies
export default function Movies() {
  const [movies, setMovies] = useState(emptyMoviesList);
  const [sortType, setSortType] = useState("");

  useEffect(function() {
    getMoviesInfo()
      .then(res => {
        setMovies(res.data.docs);
      })
      .catch(() => setMovies(emptyMoviesList));
  }, []);

  const handleSortType = function(event) {
    const value = event.target.value;
    setSortType(value);
  };

  const moviesList = useMemo(
    function() {
      if (!sortType) {
        return movies;
      }
      return movies.sort(function(movieA, movieB) {
        return movieA[sortType] > movieB[sortType] ? 1 : -1;
      });
    },
    [sortType, movies]
  );

  return (
    <div className="movies">
      <select value={sortType} onChange={handleSortType}>
        <option value={""}>sort By</option>
        <option value={"academyAwardWins"}>Academy Award Wins</option>
        <option value={"budgetInMillions"}>budget In Millions</option>
        <option value={"runtimeInMinutes"}>runtime In Minutes</option>
      </select>
      {moviesList.length ? (
        moviesList.map(function(movie) {
          return (
            <div className="movie" key={movie._id}>
              {movie.name}
            </div>
          );
        })
      ) : (
        <Loader />
      )}
    </div>
  );
}

function getMoviesInfo(movieId, quote = false) {
  let path = "";
  if (movieId) {
    path = `/movie/${movieId}`;
    path += quote ? "/quote" : "";
  } else {
    path = "/movie";
  }
  return axios.get(path);
}
