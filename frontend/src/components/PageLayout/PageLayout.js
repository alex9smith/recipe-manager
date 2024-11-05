import { Link, Outlet } from "react-router-dom";

import "./PageLayout.css";

function PageLayout() {
  return (
    <div>
      <div className="header">
        <nav className="navbar">
          <Link to="/" className="home nav-link">
            Home
          </Link>
          <Link to="/recipes" className="nav-link">
            All recipes
          </Link>
        </nav>
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

export default PageLayout;
