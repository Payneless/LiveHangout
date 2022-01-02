import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./profile.css";

function User() {
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const { userId } = useParams();
  const hangouts = useSelector((state) => Object.values(state.hangouts));

  useEffect(() => {
    dispatch(getAllHangouts());
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

  if (!user) {
    return null;
  }

  return (
    <div className="profile">
      <div className="left-profile">
        <img src={} alt="profile-photo" />
      </div>
      <div className="right-profile">
        <div className="created-hangouts">Created</div>
        <div className="rsvpd-hangouts">RSVPd</div>
        <div className="bookmarked-hangouts">Bookmarked</div>
      </div>
    </div>
  );
}
export default User;
