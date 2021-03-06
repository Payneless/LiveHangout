import React, { useState, useEffect } from "react";
import { Modal } from "../../context/modal";
import "./Hangouts.css";
import HangoutDetail from "./HangoutDetail";

function Hangouts({ hangouts }) {
  const top5 = hangouts.slice(0, 5);
  const [showModal, setShowModal] = useState(false);
  const [hangout, setHangout] = useState("");

  const displayHangout = (id) => {
    setHangout(id);
    setShowModal(true);
  };
  return (
    <div className="hangout-container">
      {top5?.map(
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
          <div key={id} className="hangout" onClick={() => displayHangout(id)}>
            <img src={image} className="photo" alt="hangout_photo"></img>
            <div className="info">
              <span className="title">{title}</span>
              <span>Starts on: {startDate.slice(0, 17)}</span>
              {open && <span>RSVPs: {rsvps.length}</span>}
              {!open && <span>Bookmarks: {bookmarks.length}</span>}
            </div>
          </div>
        )
      )}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <HangoutDetail hangoutId={hangout} setShowModal={setShowModal} />
        </Modal>
      )}
    </div>
  );
}

export default Hangouts;
