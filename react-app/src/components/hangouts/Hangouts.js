import React, { useState, useEffect } from "react";
import { getAllHangouts } from "../../store/hangouts";
import { useDispatch, useSelector } from "react-redux";

function Hangouts() {
  const dispatch = useDispatch();
  const hangouts = useSelector((state) => Object.values(state.hangouts));

  console.log("->", hangouts);

  useEffect(() => {
    dispatch(getAllHangouts());
  }, [dispatch]);

  const DisplayHangoutInfo = (hangouts) => {
    hangouts?.map(({ id, title, description }) => (
      <div key={id}>
        <span>{title}</span>
        <span>{description}</span>
      </div>
    ));
  };

  return (
    <div>
      <DisplayHangoutInfo hangouts={hangouts} />
    </div>
  );
}

export default Hangouts;
