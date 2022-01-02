import React, { useState, useEffect } from "react";
import Hangouts from "../hangouts/Hangouts";
import { useSelector, useDispatch } from "react-redux";
import { getAllHangouts } from "../../store/hangouts";
import "./home.css";

const Home = () => {
  const dispatch = useDispatch();
  const hangouts = useSelector((state) => Object.values(state.hangouts));
  console.log("hangouts", new Date());
  const hangoutsUpcoming = hangouts.filter(
    (hangout) => new Date(hangout.endDate) > new Date()
  );
  const sortedHangouts = useSelector((state) => Object.values(state.hangouts));
  const sortedHangoutsUpcoming = sortedHangouts.filter(
    (hangout) => new Date(hangout.endDate) > new Date()
  );
  console.log("test", hangoutsUpcoming);
  const [selected, setSelected] = useState(null);
  sortedHangoutsUpcoming?.sort((a, b) => b.rsvps.length - a.rsvps.length);
  const categories = new Set();
  hangoutsUpcoming?.map(({ category }) => categories.add(category));
  const catArr = Array.from(categories);

  useEffect(() => {
    dispatch(getAllHangouts());
  }, [dispatch]);
  return (
    <div className="page">
      <div className="banner">
        <h1 className="welcome">
          Connecting you to...
          <p>Well, pick one!</p>
        </h1>
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
              ? sortedHangoutsUpcoming.filter(
                  (hangout) => hangout.category == selected
                )
              : sortedHangoutsUpcoming
          }
        />
      </div>
      <div className="random-container">
        {" "}
        New Hangouts
        <Hangouts
          hangouts={
            selected
              ? hangoutsUpcoming
                  .filter((hangout) => hangout.category == selected)
                  .reverse()
              : hangoutsUpcoming.reverse()
          }
        />
      </div>
      <div className="see-more"></div>
    </div>
  );
};

export default Home;
