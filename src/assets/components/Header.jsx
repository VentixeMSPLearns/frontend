import { useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
const Header = () => {
  const location = useLocation();
  const { user } = useAuth();
  const { isDarkMode, toggleDarkMode } = useTheme();

  const getTitleFromPath = (pathname) => {
    if (pathname === "/") return "Events";
    if (pathname.startsWith("/events/")) return "Event Details";
    if (pathname === "/bookings") return "My Bookings";
    if (pathname === "/register") return "Register";
    if (pathname === "/login") return "Login";
    if (pathname === "/dashboard") return "Dashboard";
    if (pathname.startsWith("/bookevent/")) return "Book Event";
    return "Page";
  };

  const title = getTitleFromPath(location.pathname);

  return (
    <header id="site-header" className="wrapper">
      <h1 className="page-title sz-24 secondary">{title}</h1>
      <div className="info-area">
        <button className="btn btn-darkMode" onClick={toggleDarkMode}>
          <i
            className={isDarkMode ? "sz-20 fas fa-sun" : "sz-20 fas fa-moon"}
          ></i>
        </button>
        {user && (
          <div className="user-info">
            <span className="sz-20 dark">{user.username}</span>
            <img
              src={user.avatar}
              alt={`${user.username} avatar`}
              className="avatar"
            />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
