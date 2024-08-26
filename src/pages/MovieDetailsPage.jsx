import { useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import { fetchRequest } from "../themoviedb-api";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState({});
  const imageUrl = "https://image.tmdb.org/t/p/w500";

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
  const { title, release_date, genres, backdrop_path, vote_average, overview } =
    movieDetails;
  return (
    <>
      {/* <GoBack /> */}
      <div>
        <img
          src={imageUrl + backdrop_path}
          alt={title}
          width="200"
          height="300"
        ></img>
        <div>
          <h3>
            {title}({release_date})
          </h3>
          <p>User score: {vote_average}</p>
          <h4>Overview</h4>
          <p>{overview}</p>
          <h4>Genres</h4>
          {/* <p>{genres.map((genre) => genre.name)}</p> */}
        </div>
      </div>
      <p>Additional information</p>
      {/* <MovieCast />
      <MovieReviews /> */}
    </>
  );
}
