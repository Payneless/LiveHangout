import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function User() {
  const [user, setUser] = useState({});
  const { userId } = useParams();

  useEffect(() => {
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
    <ul>
      <li>
        <strong>User Id</strong> {userId}
      </li>
      <img src={user.profilePhoto} alt="profile photo"></img>
      <li>
        <strong>Username</strong> {user.fName}
      </li>
      <li>
        <strong>Discord Handle</strong> {user.discordHandle}
      </li>
      <li>
        <strong>Email</strong> {user.email}
      </li>
    </ul>
  );
}
export default User;
