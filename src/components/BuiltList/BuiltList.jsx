import { Link, useLocation } from "react-router-dom";

export default function BuiltList({ list }) {
  const location = useLocation();
  return (
    <ul>
      {list.map(({ id, title }) => {
        return (
          <li key={id}>
            <Link to={`/movies/${id}`} state={location}>
              {title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
