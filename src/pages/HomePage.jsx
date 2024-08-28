import MovieList from "../components/MovieList/MovieList";

export default function HomePage() {
  return (
    <>
      <h2>Trending today</h2>
      <MovieList url={"https://api.themoviedb.org/3/trending/movie/day"} />
    </>
  );
}
