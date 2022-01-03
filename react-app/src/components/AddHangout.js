import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { addAHangout } from "../store/hangouts";
import "./AddHangout.css";

const Add = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const host = useSelector((state) => state.session.user);
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState("");
  const [open, setOpen] = useState(null);
  const [category, setCategory] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [description, setDescription] = useState("");
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState([]);
  const [errCheck, setErrCheck] = useState(false);

  const validator = () => {
    let error = [];
    let present = new Date();

    if (title.length > 50) {
      error.push(": Please enter a Title shorter than 50 characters");
    } else if (title.length < 4) {
      error.push(": Please enter a title longer than 4 characters");
    }

    if (!/https:\/\/discord.gg\/.+/gi.test(link)) {
      error.push(": Link must be a Discord invite link");
    }

    if (new Date(startDate) <= present) {
      error.push(": Start date must be in the future");
    }

    if (endDate < startDate) {
      error.push(": End date must be after Start date");
    }

    if (10 > description.length) {
      error.push(": Description must be between 10 and 2000 characters");
    }
    return error;
  };

  const handleSubmit = async (e) => {
    setErrors([]);
    e.preventDefault();
    const errorsArr = validator();
    if (errorsArr.length) {
      setErrCheck(true);
      setErrors(errorsArr);
      return;
    } else {
      setErrCheck(false);
      const payload = {
        host: host.id,
        title,
        link,
        image,
        open,
        category,
        startDate,
        endDate,
        startTime,
        endTime,
        description,
      };
      const res = await dispatch(addAHangout(payload));
      if (res) {
        const hangoutData = res;
        setErrors(hangoutData);
      }
      if (errors.length == 0) {
        setSuccess(true);
        setTimeout(() => history.push("/home"), 3000);
      }
    }
  };

  return (
    <div className="new-hangout-form">
      <div className="left-container"></div>
      <form onSubmit={handleSubmit} className="hangout-form">
        <ul className={`errors-list error-${errCheck}`}>
          {errors.map((error, idx) => (
            <li key={idx}>{error.split(":")}</li>
          ))}
        </ul>
        <div className="label-input">Title:</div>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          placeholder="Title"
        />
        <div className="label-input">Discord Link:</div>
        <input
          type="text"
          onChange={(e) => setLink(e.target.value)}
          value={link}
          placeholder="Discord Link"
        />
        <div className="label-input">Banner Image:</div>
        <input
          type="text"
          onChange={(e) => setImage(e.target.value)}
          value={image}
          placeholder="Uploaded Image"
        />
        <div className="label-input">Status:</div>
        <div onChange={(e) => setOpen(e.target.value)}>
          <input type="radio" value="true" name="open" /> Open
          <input type="radio" value="false" name="open" /> Not Open
        </div>
        <div className="label-input">Category:</div>
        <select onChange={(e) => setCategory(e.target.value)}>
          <option value="disabled">Category</option>
          <option value="Chill">Chill</option>
          <option value="Watch Party">Watch Party</option>
          <option value="Concert">Concert</option>
          <option value="Workshop">Workshop</option>
          <option value="AMA">AMA</option>
        </select>
        <div className="label-input">Start Date:</div>
        <input
          type="date"
          onChange={(e) => setStartDate(e.target.value)}
          value={startDate}
          placeholder="date"
        />
        <div className="label-input">End Date:</div>
        <input
          type="date"
          onChange={(e) => setEndDate(e.target.value)}
          value={endDate}
          placeholder="date"
        />
        <div className="label-input">Start Time:</div>
        <input
          type="time"
          onChange={(e) => setStartTime(e.target.value)}
          value={startTime}
          placeholder="time"
        />
        <div className="label-input">End Time:</div>
        <input
          type="time"
          onChange={(e) => setEndTime(e.target.value)}
          value={endTime}
          placeholder="time"
        />
        <div className="label-input">Tell us about your hangout!</div>
        <textarea
          type="text"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          placeholder="Description"
        />
        <button className="submit-button" type="submit">
          Create
        </button>
      </form>
      <div className="right-container">
        {success && (
          <>
            <div className="success-submit">
              <img
                className="success-submit-img"
                src="https://cdn.discordapp.com/attachments/897232495580414045/927092877534834708/1200px-Eo_circle_green_white_checkmark.svg.png"
                alt="success"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Add;
