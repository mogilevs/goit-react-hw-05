import { useEffect, useState } from "react";
import { fetchRequest } from "../../themoviedb-api";
import BuiltList from "../BuiltList/BuiltList";

export default function MovieList({ url }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function moviesRequest() {
      try {
        setLoading(true);
        setError(false);
        const res = await fetchRequest(url);
        setMovies(res.data.results);
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    moviesRequest();
  }, [url]);

  return (
    <>
      {error && <p>Something went wrong! Please try again later.</p>}
      {loading && <p>Loading...</p>}
      <BuiltList list={movies} />
    </>
  );
}
