import { Formik, Form, Field } from "formik";
import { useState } from "react";
import MovieList from "../components/MovieList/MovieList";
import css from "./MoviesPage.module.css";
import { useSearchParams } from "react-router-dom";

export default function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.q || null);

  const handleSubmit = (value, actions) => {
    if (value === "") return;
    console.log(value.search);
    setQuery(value.search);
    const q = searchParams.get("q");
    setSearchParams({ q: value.search });
    actions.resetForm();
  };

  return (
    <>
      <Formik initialValues={{ search: "" }} onSubmit={handleSubmit}>
        <Form className={css.form}>
          <Field className={css.input} type="text" name="search"></Field>
          <button className={css.button} type="submit">
            Search
          </button>
        </Form>
      </Formik>
      {query && (
        <MovieList
          url={`https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&query=${query}`}
        />
      )}
    </>
  );
}
