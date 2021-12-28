import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import LoginFormModal from "./auth/LoginIndex";
import LogoutButton from "./auth/LogoutButton";
import SignUpFormModal from "./auth/SignUpIndex";
import "./NavBar.css";

const NavBar = () => {
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [adding, setAdding] = useState(false);
  // if (!sessionUser) {
  //   return (
  //     <nav>
  //       <div className="nav-bar">
  //         <img
  //           onClick={() => history.push("/")}
  //           className="logo-nav"
  //           src="https://cdn.discordapp.com/attachments/890713980878876682/921570471168847893/livehangoutslogo-bauhaus.png"
  //           alt="logo"
  //         />
  //         <span className="buttons">
  //           <LoginFormModal />
  //           <SignUpFormModal />
  //         </span>
  //       </div>
  //     </nav>
  //   );
  // }
  return (
    <nav>
      <div className="nav-bar">
        {sessionUser ? (
          <>
            <img
              onClick={() => {
                setAdding(false);
                history.push("/");
              }}
              className="logo-nav"
              src="https://cdn.discordapp.com/attachments/890713980878876682/921570471168847893/livehangoutslogo-bauhaus.png"
              alt="logo"
            />
            <span>
              <img
                className="add-button"
                src="https://cdn.discordapp.com/attachments/897232495580414045/925147162654937188/JAKESPLUS.png"
                alt="add"
                onClick={() => {
                  history.push("/");
                }}
              />

              <LogoutButton />
            </span>
          </>
        ) : (
          <>
            <img
              onClick={() => history.push("/")}
              className="logo-nav"
              src="https://cdn.discordapp.com/attachments/890713980878876682/921570471168847893/livehangoutslogo-bauhaus.png"
              alt="logo"
            />
            <span className="buttons">
              <LoginFormModal />
              <SignUpFormModal />
            </span>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
