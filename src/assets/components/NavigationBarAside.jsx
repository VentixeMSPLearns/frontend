import NavLink from "./NavLink";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logosvg from "../images/logo.svg";
const NavigationBarAside = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    logout();
    navigate(location.pathname);
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <nav id="navbar" className="not-on-mobile">
      <Link to="/" className="logo">
        <img className="logo-image" src={logosvg} alt="" />
        <p className="logo-text not-on-tablet">Ventixe</p>
      </Link>
      <ul className="navlink-container">
        <NavLink to="/" iconClass="ticket-perforated">
          Events
        </NavLink>
        {user && (
          <NavLink to="/dashboard" iconClass="chart-network">
            Dashboard
          </NavLink>
        )}
        {user && (
          <NavLink to="/bookings" iconClass="square-check">
            Bookings
          </NavLink>
        )}
      </ul>

      {user ? (
        <button className="btn btn-logout" onClick={handleLogoutClick}>
          <i className="fa-regular fa-arrow-right-from-bracket"></i>
          <p className="not-on-tablet">Sign out</p>
        </button>
      ) : (
        <button className="btn btn-logout" onClick={handleLoginClick}>
          <i className="fa-regular fa-arrow-right-to-bracket"></i>
          <p className="not-on-tablet">Log in</p>
        </button>
      )}
    </nav>
  );
};

export default NavigationBarAside;
