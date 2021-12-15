import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../../store/session";
import "../NavBar.css";

const LogoutButton = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const onLogout = async (e) => {
    await dispatch(logout()).then(history.push("/"));
  };

  return (
    <div className="button" onClick={onLogout}>
      Logout
    </div>
  );
};

export default LogoutButton;
