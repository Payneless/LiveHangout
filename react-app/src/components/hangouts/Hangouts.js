import React, { useState, useEffect } from "react";
import { getAllHangouts } from "../../store/hangouts";
import { useDispatch, useSelector } from "react-redux";
import "./Hangouts.css";

function Hangouts({ hangouts }) {
  const dispatch = useDispatch();


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
            <img src={image} className="photo" alt="hangout_photo"></img>
            <div className="info">
              <span>{title}</span>
              <span>Hosted by: {host}</span>
              <span>Open for RSVP: {open.toString()}</span>
              {open && <span>RSVPs: {rsvps.length}</span>}
              {!open && <span>Bookmarks: {bookmarks.length}</span>}
              <span>
                Starts on:{startDate.slice(0, 17)} Ends on:
                {endDate.slice(0, 17)}
              </span>
              <span>
                Timeframe:{startTime.slice(0, 5)}-{endTime.slice(0, 5)}
              </span>
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default Hangouts;
