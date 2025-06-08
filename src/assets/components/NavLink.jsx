import { Link, useMatch, useResolvedPath } from "react-router-dom";

function NavLink({ to, iconClass, children }) {
  // To check if the current route matches this link (for active styling)
  let absolutePath = useResolvedPath(to);
  let matchCurrentPath = useMatch({ path: absolutePath.pathname, end: true });

  return (
    <li className={`navlink-item`}>
      <Link to={to} className={`navlink ${matchCurrentPath ? "active" : ""}`}>
        <i className={`navlink-icon fa-regular fa-${iconClass}`}></i>
        <p className="navlink-text not-on-tablet">{children}</p>
      </Link>
    </li>
  );
}

export default NavLink;
