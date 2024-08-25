import { useEffect, useState } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import clsx from "clsx";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import HomePage from "./pages/HomePage";
import MoviesPage from "./pages/MoviesPage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import MovieCast from "./components/MovieCast/MovieCast";
import MovieReviews from "./components/MovieReviews/MovieReviews";
import NotFoundPage from "./pages/NotFoundPage";
import axios from "axios";

function App() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const buildLinkClass = ({ isActive }) => {
    return clsx("link", isActive && "active");
  };
  const url =
    "https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1";
  const imageUrl = "https://image.tmdb.org/t/p/w500";
  const options = {
    headers: {
      // Замість api_read_access_token вставте свій токен
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1OWZlYTc2MGYwYjNiMDA1MzdjZjUxNjAyOThlYzYwMCIsIm5iZiI6MTcyNDYwOTI5MC42MzUyNDIsInN1YiI6IjY2Y2IzZTczN2MxYWUyNGEzMDBmOGJhYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xPLJpJDs-V4d_S27LEUpu9knTECN5dmXgeU3U2N0mMo",
    },
  };

  async function trendingMoviesRequest() {
    await axios
      .get("https://api.themoviedb.org/3/trending/movie/day", options)
      .then((response) => setTrendingMovies(response.data.results))
      .catch((err) => console.error(err));
  }
  trendingMoviesRequest();

  return (
    <>
      <Navigation>
        <NavLink to="/" className={buildLinkClass}>
          Home
        </NavLink>
        <NavLink to="/movies" className={buildLinkClass}>
          Movies
        </NavLink>
      </Navigation>
      <h2>Trending today</h2>
      <ul>
        {trendingMovies.map(({ id, title }) => {
          return (
            <li key={id}>
              <a href={`/movies/:${id}`} alt={title}>
                {title}
              </a>
            </li>
          );
        })}
      </ul>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
          <Route path="cast" element={<MovieCast />} />
          <Route path="reviews" element={<MovieReviews />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
