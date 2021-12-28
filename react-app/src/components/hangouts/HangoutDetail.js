import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./Hangouts.css";

const HangoutDetail = ({ hangoutId }) => {
  const history = useHistory();
  const hangout = useSelector((state) => state.hangouts[hangoutId]);
  const sessionUser = useSelector((state) => state.session.user);
  return (
    <div className="hangout-detail">
      {sessionUser.id === hangout.hostId && (
        <div className="tool-buttons">
          <div
            className="edit-button"
            onClick={() => history.push(`${hangoutId}/edit`)}
          >
            Edit
          </div>
          <div className="delete-button">Delete</div>
        </div>
      )}
      <img src={hangout.image} className="image" />
      <div>{hangout.title}</div>
      <div>{hangout.host}</div>
    </div>
  );
};

export default HangoutDetail;
