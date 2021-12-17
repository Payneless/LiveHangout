import React, { useState, useEffect } from "react";
import Hangouts from "../hangouts/Hangouts";
import { useSelector, useDispatch } from "react-redux";
import { getAllHangouts } from "../../store/hangouts";
import "./home.css";

const Home = () => {
  const dispatch = useDispatch();
  const hangouts = useSelector((state) => Object.values(state.hangouts));
  const sortedHangouts = useSelector((state) => Object.values(state.hangouts));
  const [selected, setSelected] = useState(null);
  sortedHangouts?.sort((a, b) => b.rsvps.length - a.rsvps.length);
  const categories = new Set();
  hangouts?.map(({ category }) => categories.add(category));
  const catArr = Array.from(categories);

  useEffect(() => {
    dispatch(getAllHangouts());
  }, [dispatch]);
  return (
    <div className="page">
      <div className="banner">
        <h1 className="welcome">Live Hangout</h1>
      </div>
      <div className="categories">
        {catArr?.map((category, idx) => (
          <div
            key={idx}
            className="category"
            onClick={
              selected === category
                ? () => setSelected(null)
                : () => setSelected(category)
            }
          >
            {category}
          </div>
        ))}
      </div>
      <div className="popular-container">
        {" "}
        Most Popular
        <Hangouts
          hangouts={
            selected
              ? sortedHangouts.filter((hangout) => hangout.category == selected)
              : sortedHangouts
          }
        />
      </div>
      <div className="random-container">
        {" "}
        Other Hangouts
        <Hangouts
          hangouts={
            selected
              ? hangouts.filter((hangout) => hangout.category == selected)
              : hangouts
          }
        />
      </div>
      <div className="see-more"></div>
    </div>
  );
};

export default Home;
