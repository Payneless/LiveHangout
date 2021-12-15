import React, { useState, useEffect } from "react";

function Hangouts() {
  const [hangouts, setHangouts] = useState("");

  const execute = async () => {
    const response = await fetch("/api/hangouts");
    const hangoutsList = await response.json();
    console.log("yo", hangoutsList);
    setHangouts(hangoutsList);
  };
  useEffect(() => {
    console.log("hello?");
    execute();
  });
  const DisplayHangoutInfo = (hangouts) => {
    console.log(String.fromCodePoint(0x1f600), hangouts);
    for (let hangout in hangouts) {
      return (
        <div>
          <span>{hangout.title}</span>
          <span>{hangout.description}</span>
        </div>
      );
    }
  };
  return (
    <div>
      <DisplayHangoutInfo hangouts={hangouts} />
    </div>
  );
}

export default Hangouts;
