import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchRequest } from "../themoviedb-api";
import MovieDetailsContent from "../components/MovieDetailsContent/MovieDetailsContent";
import css from "./MovieDetailsPage.module.css";
import GoBack from "../components/GoBack/GoBack";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const location = useLocation();
  const backLinkHref = location.state ?? "/";

  useEffect(() => {
    async function getmovieDetails() {
      try {
        const res = await fetchRequest(
          `https://api.themoviedb.org/3/movie/${movieId}`
        );
        setMovieDetails(res.data);
      } catch (error) {
        console.error(error);
      }
    }
    getmovieDetails();
  }, [movieId]);

  return (
    <>
      <GoBack to={backLinkHref}>Go back</GoBack>
      {movieDetails && <MovieDetailsContent details={movieDetails} />}
      <p>Additional information</p>
      <ul className={css.list}>
        <li>
          <Link to="cast">Cast</Link>
        </li>
        <li>
          <Link to="reviews">Reviews</Link>
        </li>
      </ul>
      <Outlet context={movieId} />
    </>
  );
}
