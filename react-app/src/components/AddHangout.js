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
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("1", host.id);
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
      console.log(hangoutData);
      setErrors(hangoutData);
    }
    if (errors.length == 0) {
      history.push("/new");
    }
  };

  return (
    <div className="new-hangout-form">
      <form onSubmit={handleSubmit} className="hangout-form">
        <ul className="errors-list">
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        Title:
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          placeholder="Title"
        />
        Discord Link:
        <input
          type="text"
          onChange={(e) => setLink(e.target.value)}
          value={link}
          placeholder="Discord Link"
        />
        Banner Image:
        <input
          type="text"
          onChange={(e) => setImage(e.target.value)}
          value={image}
          placeholder="Image"
        />
        Status:
        <div onChange={(e) => setOpen(e.target.value)}>
          <input type="radio" value="true" name="open" /> Open
          <input type="radio" value="false" name="open" /> Not Open
        </div>
        Category:
        <select onChange={(e) => setCategory(e.target.value)}>
          <option value="disabled">Category</option>
          <option value="Chill">Chill</option>
          <option value="Watch Party">Watch Party</option>
          <option value="Concert">Concert</option>
          <option value="Workshop">Workshop</option>
          <option value="AMA">AMA</option>
        </select>
        Start Date:
        <input
          type="date"
          onChange={(e) => setStartDate(e.target.value)}
          value={startDate}
          placeholder="date"
        />
        End Date:
        <input
          type="date"
          onChange={(e) => setEndDate(e.target.value)}
          value={endDate}
          placeholder="date"
        />
        Start Time:
        <input
          type="time"
          onChange={(e) => setStartTime(e.target.value)}
          value={startTime}
          placeholder="time"
        />
        End Time:
        <input
          type="time"
          onChange={(e) => setEndTime(e.target.value)}
          value={endTime}
          placeholder="time"
        />
        Tell us about your hangout!
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
    </div>
  );
};

export default Add;
