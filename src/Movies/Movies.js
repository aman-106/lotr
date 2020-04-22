import React, { useState, useEffect, useMemo } from "react";
import axios from "../AxiosInstance";

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
const emptyMoviesList = [];

export default function Movies(props) {
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
      {moviesList.map(function(movie) {
        return (
          <div className="movie" key={movie._id}>
            {movie.name}
          </div>
        );
      })}
    </div>
  );
}

// academyAwardNominations: 7
// academyAwardWins: 1
// boxOfficeRevenueInMillions: 2932
// budgetInMillions: 675
// name: "The Hobbit Series"
// runtimeInMinutes: 462
