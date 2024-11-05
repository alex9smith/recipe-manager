import { Link, Outlet } from "react-router-dom";

import "./PageLayout.css";

function PageLayout() {
  return (
    <div>
      <div class="header">
        <nav class="navbar">
          <Link to="/" className="home nav-link">
            Home
          </Link>
          <Link to="/recipes" className="nav-link">
            All recipes
          </Link>
        </nav>
      </div>
      <div class="content">
        <Outlet />
      </div>
    </div>
  );
}

export default PageLayout;
