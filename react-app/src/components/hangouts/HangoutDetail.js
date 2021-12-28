import React, { useState, useEffect } from "react";
import { getOneHangout } from "../../store/hangouts";
import { useDispatch, useSelector } from "react-redux";
import "./Hangouts.css";

const HangoutDetail = ({ hangoutId }) => {
  const hangout = useSelector((state) => state.hangouts[hangoutId]);
  const sessionUser = useSelector((state) => state.session.user);
  return (
    <div className="hangout-detail">
      {sessionUser.id === hangout.host}
      <img src={hangout.image} className="image" />
      <div>{hangout.title}</div>
      <div>{hangout.host}</div>
    </div>
  );
};

export default HangoutDetail;
