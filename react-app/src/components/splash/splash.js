import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import LoginForm from "../auth/LoginForm";
import { Modal } from "../../context/modal";
import { useState } from "react";
import { getAllHangouts } from "../../store/hangouts";
import HangoutDetail from "../hangouts/HangoutDetail";
import "./splash.css";

const Splash = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [hangout, setHangout] = useState("");
  const [hangoutModal, setHangoutModal] = useState("");
  const sessionUser = useSelector((state) => state.session.user);
  const hangouts = useSelector((state) => Object.values(state.hangouts));
  hangouts?.sort((a, b) => b.rsvps.length - a.rsvps.length);

  const displayHangout = (id) => {
    setHangout(id);
    setHangoutModal(true);
  };
  const prompt = () =>
    sessionUser ? history.push("/home") : setShowModal(true);

  useEffect(() => {
    dispatch(getAllHangouts());
  }, [dispatch]);
  return (
    <div className="splash-page">
      <div className="event" onClick={() => displayHangout(hangouts[0].id)}>
        <img
          src={hangouts[0]?.image}
          className="photo"
          alt="hangout_photo"
        ></img>
        <div className="info">
          <span>{hangouts[0]?.title}</span>
          <span>Hosted by: {hangouts[0]?.host}</span>
          <span>RSVPs: {hangouts[0]?.rsvps.length}</span>
          <span>
            Starts on:{hangouts[0]?.startDate.slice(0, 17)} Ends on:
            {hangouts[0]?.endDate.slice(0, 17)}
          </span>
          <span>
            Timeframe:{hangouts[0]?.startTime.slice(0, 5)}-
            {hangouts[0]?.endTime.slice(0, 5)}
          </span>
        </div>
      </div>
      <div className="splash-welcome">
        <h1 className="welcome-message">Welcome to</h1>
        <img
          className="logo"
          src="https://cdn.discordapp.com/attachments/890713980878876682/921570471168847893/livehangoutslogo-bauhaus.png"
          alt="logo"
        />
        {sessionUser !== null && (
          <h1 className="welcome-message">{sessionUser.fName}!</h1>
        )}
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <LoginForm />
          </Modal>
        )}
        <div className="preview" onClick={() => prompt()}>
          <div className="explore">
            <img
              className="mag-glass"
              src="https://cdn.discordapp.com/attachments/897232495580414045/921449580447559791/searchwhite.png"
              alt="search"
            />
          </div>
        </div>
        <span className="splash-description">
          {" "}
          LiveHangouts is an online platform for users to publish, advertise,
          and join online hangouts of various kinds in order to meet new
          friends, learn, or experience various entertainment!
        </span>
      </div>
      <div className="event" onClick={() => displayHangout(hangouts[1].id)}>
        <img
          src={hangouts[1]?.image}
          className="photo"
          alt="hangout_photo"
        ></img>
        <div className="info">
          <span>{hangouts[1]?.title}</span>
          <span>Hosted by: {hangouts[1]?.host}</span>
          <span>RSVPs: {hangouts[1]?.rsvps.length}</span>
          <span>
            Starts on:{hangouts[1]?.startDate.slice(0, 17)} Ends on:
            {hangouts[1]?.endDate.slice(0, 17)}
          </span>
          <span>
            Timeframe:{hangouts[1]?.startTime.slice(0, 5)}-
            {hangouts[1]?.endTime.slice(0, 5)}
          </span>
        </div>
      </div>
      {hangoutModal && (
        <Modal onClose={() => setHangoutModal(false)}>
          <HangoutDetail hangoutId={hangout} setShowModal={setHangoutModal} />
        </Modal>
      )}
    </div>
  );
};

export default Splash;
