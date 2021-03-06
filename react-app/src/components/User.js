import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllHangouts } from "../store/hangouts";
import HangoutDetail from "./hangouts/HangoutDetail";
import { Modal } from "../context/modal";
import "./profile.css";

function User() {
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const [isLoaded, setisLoaded] = useState(false);
  const [showModalProfile, setShowModalProfile] = useState(false);
  const [hangoutProfile, setHangoutProfile] = useState("");
  const { userId } = useParams();
  let created = user.hangouts;
  let bookmarked = user.Bookmarks;
  let rsvps = user.RSVPs;

  const displayHangout = (id) => {
    setHangoutProfile(id);
    setShowModalProfile(true);
  };

  useEffect(() => {
    dispatch(getAllHangouts());
    created = user.hangouts;
    bookmarked = user.Bookmarks;
    rsvps = user.RSVPs;
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const currentUser = await response.json();
      setUser(currentUser);
    })();
    setisLoaded(true);
  }, [userId]);

  if (!user) {
    return null;
  }

  {
    return (
      isLoaded && (
        <div className="profile">
          <div className="left-profile">
            <img
              className="profile-photo"
              src={user?.profilePhoto}
              alt="profile-photo"
            />
            <span>{user?.fName}</span>
            <span>{user?.discordHandle}</span>
            <span>Hangouts Organized: {user.hangouts?.length}</span>
            <span>RSVPs: {user.RSVPs?.length}</span>
            <span>Bookmarked Hangouts: {user.Bookmarks?.length}</span>
          </div>
          <div className="right-profile">
            <div className="label-profile">Created</div>
            <div className="created-hangouts">
              {created?.map(({ id, title, image }) => (
                <div
                  key={id}
                  className="profile-hangout"
                  onClick={() => displayHangout(id)}
                >
                  <img
                    src={image}
                    className="profile-hangout-photo"
                    alt={`profile-hangout-photo-${id}`}
                  />
                  <div className="info">
                    <span className="title">{title}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="label-profile">Rsvp'd</div>
            <div className="rsvpd-hangouts">
              {rsvps?.map(
                ({ hangout, hangoutTitle, hangoutPhoto, hangoutHost }) => (
                  <div
                    key={hangout}
                    className="profile-hangout"
                    onClick={() => displayHangout(hangout)}
                  >
                    <img
                      src={hangoutPhoto}
                      className="profile-hangout-photo"
                      alt={`profile-hangout-photo-${hangout}`}
                    />
                    <div className="info">
                      <span className="title">{hangoutTitle}</span>
                      <span className="host">{hangoutHost}</span>
                    </div>
                  </div>
                )
              )}
            </div>
            <div className="label-profile">Bookmarked</div>
            <div className="bookmarked-hangouts">
              {bookmarked?.map(
                ({ hangout, hangoutTitle, hangoutPhoto, hangoutHost }) => (
                  <div
                    key={hangout}
                    className="profile-hangout"
                    onClick={() => displayHangout(hangout)}
                  >
                    <img
                      src={hangoutPhoto}
                      className="profile-hangout-photo"
                      alt={`profile-hangout-photo-${hangout}`}
                    />
                    <div className="info">
                      <span className="title">{hangoutTitle}</span>
                      <span className="host">{hangoutHost}</span>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
          {showModalProfile && (
            <Modal onClose={() => setShowModalProfile(false)}>
              <HangoutDetail
                hangoutId={hangoutProfile}
                setShowModal={setShowModalProfile}
              />
            </Modal>
          )}
        </div>
      )
    );
  }
}
export default User;
