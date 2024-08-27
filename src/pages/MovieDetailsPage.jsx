import { Link, Outlet, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchRequest } from "../themoviedb-api";
import MovieDetailsContent from "../components/MovieDetailsContent/MovieDetailsContent";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    async function getmovieDetails() {
      try {
        const res = await fetchRequest(
          `https://api.themoviedb.org/3/movie/${movieId}`
        );
        console.log(res);
        setMovieDetails(res.data);
      } catch (error) {
        console.error(error);
      }
    }
    getmovieDetails();
  }, [movieId]);

  return (
    <>
      {/* <GoBack /> */}
      {movieDetails && <MovieDetailsContent details={movieDetails} />}
      <p>Additional information</p>
      <ul>
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
