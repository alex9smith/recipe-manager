import { Link, Outlet } from "react-router-dom";

function PageLayout() {
  return (
    <div>
      <header>
        <p>
          <Link to="/">Home</Link>
        </p>
      </header>
      <Outlet />
    </div>
  );
}

export default PageLayout;
