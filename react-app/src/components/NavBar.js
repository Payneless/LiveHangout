import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import LoginFormModal from "./auth/LoginIndex";
import LogoutButton from "./auth/LogoutButton";
import SignUpFormModal from "./auth/SignUpIndex";
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
          <LoginFormModal />
          <SignUpFormModal />
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
        <LogoutButton />
      </div>
    </nav>
  );
};

export default NavBar;
