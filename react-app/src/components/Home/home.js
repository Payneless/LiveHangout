import React, { useState, useEffect } from "react";
import Hangouts from "../hangouts/Hangouts";

const Home = () => {
  return (
    <div className="page">
      <div className="banner"></div>
      <div className="categories"></div>
      <div className="main-container">
        <Hangouts />
      </div>
      <div className="see-more"></div>
    </div>
  );
};

export default Home;
