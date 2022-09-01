import { Link, Outlet } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <div className="navbar bg-base-100 border">
        <div className="flex-1">
          <Link className="btn btn-ghost normal-case text-xl" to="/">
            Athmosphere Calculator
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal p-0">
            <li>
              <Link to="/"> Athmospehre parameters </Link>
            </li>
            <li>
              <Link to="/height">Height</Link>
            </li>
            <li>
              <Link to="/theory">Theory</Link>
            </li>
          </ul>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Header;
