export default function MovieList({ list }) {
  return (
    <ul>
      {list.map(({ id, title }) => {
        return (
          <li key={id}>
            <a href={`/movies/${id}`}>{title}</a>
          </li>
        );
      })}
    </ul>
  );
}
