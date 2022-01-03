import React from "react";

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer-bar">Made By: Jake Payne</div>
      <a href="https://github.com/Payneless" target="_blank">
        <div className="footer-circle">
          <img
            className="github"
            src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
          ></img>
        </div>
      </a>
      <a
        href="https://www.linkedin.com/in/jake-payne-aba009155/"
        target="_blank"
      >
        <div className="footer-circle">
          <img
            className="github"
            src="https://brandlogos.net/wp-content/uploads/2016/06/linkedin-logo-512x512.png"
          ></img>
        </div>
      </a>
    </div>
  );
}
