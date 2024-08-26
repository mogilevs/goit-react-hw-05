import { useEffect, useState } from "react";
import { fetchRequest } from "../themoviedb-api";

export default function HomePage() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  useEffect(() => {
    async function trendingMoviesRequest() {
      try {
        const res = await fetchRequest(
          "https://api.themoviedb.org/3/trending/movie/day"
        );
        setTrendingMovies(res.data.results);
      } catch (error) {
        console.error(error);
      }
    }
    trendingMoviesRequest();
  }, []);
  return (
    <>
      <h2>Trending today</h2>
      <ul>
        {trendingMovies.map(({ id, title }) => {
          return (
            <li key={id}>
              <a href={`/movies/${id}`}>{title}</a>
            </li>
          );
        })}
      </ul>
    </>
  );
}
