import React, { useState, useEffect } from "react";
import { getAllHangouts } from "../../store/hangouts";
import { useDispatch, useSelector } from "react-redux";
import "./Hangouts.css";

function Hangouts() {
  const dispatch = useDispatch();
  const hangouts = useSelector((state) => Object.values(state.hangouts));

  useEffect(() => {
    dispatch(getAllHangouts());
  }, [dispatch]);

  return (
    <div className="hangout-container">
      {hangouts?.map(
        ({
          id,
          title,
          host,
          description,
          image,
          open,
          startDate,
          endDate,
          startTime,
          endTime,
          rsvps,
          bookmarks,
        }) => (
          <div key={id} className="hangout">
            <span>{title}</span>
            <span>Hosted by: {host}</span>
            <span>Open for RSVP: {open.toString()}</span>
            {open && <span>RSVPs: {rsvps.length}</span>}
            {!open && <span>Bookmarks: {bookmarks.length}</span>}
            <span>{description}</span>
            <img src={image} alt="hangout_photo"></img>
            <span>
              Starts on:{startDate} Ends on:{endDate}
            </span>
            <span>
              Timeframe:{startTime}-{endTime}
            </span>
          </div>
        )
      )}
    </div>
  );
}

export default Hangouts;
