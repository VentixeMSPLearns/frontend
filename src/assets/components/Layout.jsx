import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import { Link } from "react-router-dom";
import NavigationBarAside from "./NavigationBarAside.jsx";

const Layout = () => {
  return (
    <div className="screen">
      <div className="layout">
        <NavigationBarAside />
        <Header />
        <main className="main-content wrapper">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};
export default Layout;
