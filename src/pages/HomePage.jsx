import { useEffect, useState } from "react";
import { fetchRequest } from "../themoviedb-api";
import MovieList from "../components/MovieList/MovieList";

export default function HomePage() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function trendingMoviesRequest() {
      try {
        setLoading(true);
        setError(false);
        const res = await fetchRequest(
          "https://api.themoviedb.org/3/trending/movie/day"
        );
        setTrendingMovies(res.data.results);
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    trendingMoviesRequest();
  }, []);

  return (
    <>
      <h2>Trending today</h2>
      {error && <p>Something went wrong! Please try again later.</p>}
      {!loading ? <MovieList list={trendingMovies} /> : <p>Loading...</p>}
    </>
  );
}
