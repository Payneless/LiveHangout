import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AddRsvp, deleteHangout, DeleteRsvp } from "../../store/hangouts";
import "./Hangouts.css";

const HangoutDetail = ({ hangoutId, setShowModal }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const hangout = useSelector((state) => state.hangouts[hangoutId]);
  const [notRsvpd, setNotRsvpd] = useState(true);
  const sessionUser = useSelector((state) => state.session.user);
  console.log("open", hangout.open);

  const RSVPadd = async (hangoutId, userId) => {
    dispatch(AddRsvp(hangoutId, userId));
    setNotRsvpd(false);
  };
  const RSVPdelete = async (hangoutId, userId) => {
    dispatch(DeleteRsvp(hangoutId, userId));
    setNotRsvpd(true);
  };
  const handleDelete = async (hangoutId) => {
    dispatch(deleteHangout(hangoutId));
    setShowModal(false);
  };
  useEffect(() => {
    hangout.rsvps.forEach((rsvp) => {
      console.log("yop", rsvp.userId, sessionUser.id);
      if (rsvp.user === sessionUser.id) {
        setNotRsvpd(false);
      }
    });
  }, []);

  return (
    <div className="hangout-detail">
      {sessionUser.id === hangout.hostId && (
        <div className="tool-dropdown">
          <button className="dropdown-button">Options</button>
          <div className="dropdown-content">
            <div
              className="edit-button"
              onClick={() => history.push(`${hangoutId}/edit`)}
            >
              Edit
            </div>
            <div
              className="delete-button"
              onClick={() => handleDelete(hangoutId)}
            >
              Delete
            </div>
          </div>
        </div>
      )}
      <img src={hangout.image} className="image" />
      <div className="main-info">
        <div>{hangout.title}</div>
        <div>{hangout.host}</div>
        {hangout.open == true ? (
          <>
            <div>RSVPs: {hangout.rsvps.length}</div>
            {notRsvpd ? (
              <button onClick={() => RSVPadd(hangoutId, sessionUser.id)}>
                RSVP
              </button>
            ) : (
              <button onClick={() => RSVPdelete(hangoutId, sessionUser.id)}>
                Cancel
              </button>
            )}
          </>
        ) : (
          <div>Bookmarks: {hangout.bookmarks.length}</div>
        )}
      </div>
      <div className="description-box">
        <div className="description">{hangout.description}</div>
      </div>
    </div>
  );
};

export default HangoutDetail;
