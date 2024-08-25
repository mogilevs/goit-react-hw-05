import css from "./Navigation.module.css";
export default function Navigation({ children }) {
  return <nav className={css.nav}>{children}</nav>;
}
