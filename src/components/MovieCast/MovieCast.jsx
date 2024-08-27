import { useEffect, useState } from "react";
import { fetchRequest } from "../../themoviedb-api";
import { useOutletContext } from "react-router-dom";
import MovieCastList from "../MovieCastList/MovieCastList";

export default function MovieCast() {
  const [cast, setCast] = useState(null);
  const movieId = useOutletContext();

  useEffect(() => {
    async function getCredits() {
      try {
        const res = await fetchRequest(
          `https://api.themoviedb.org/3/movie/${movieId}/credits`
        );
        console.log(res);
        setCast(res);
      } catch (error) {
        console.error(error);
      } finally {
      }
    }
    getCredits();
  }, [movieId]);

  return <>{cast && <MovieCastList cast={cast} />}</>;
}
