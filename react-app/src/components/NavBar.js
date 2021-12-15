import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import LogoutButton from "./auth/LogoutButton";
import "./NavBar.css";

const NavBar = () => {
  const sessionUser = useSelector((state) => state.session.user);
  if (!sessionUser) {
    return (
      <nav>
        <div className="nav-bar">
          {/* <div>
            <NavLink to="/" exact={true} className="active">
              Home
            </NavLink>
          </div> */}
          <div>
            <NavLink to="/login" exact={true} className="active">
              Login
            </NavLink>
          </div>
          <div>
            <NavLink to="/sign-up" exact={true} className="active">
              Sign Up
            </NavLink>
          </div>
          {/* <li>
            <NavLink to="/users" exact={true} className="active">
              Users
            </NavLink>
          </li> */}
        </div>
      </nav>
    );
  }
  return (
    <nav>
      <div className="nav-bar">
        <div className=" nav-buttons">
          <LogoutButton />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
