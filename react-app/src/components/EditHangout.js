import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { editAHangout } from "../store/hangouts";
import { getOneHangout } from "../store/hangouts";
import "./AddHangout.css";

const Edit = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { hangoutId } = useParams();
  const hangout = useSelector((state) => state.hangouts[hangoutId]);
  const host = useSelector((state) => state.session.user);
  const [title, setTitle] = useState(hangout?.title);
  const [link, setLink] = useState(hangout?.link);
  const [image, setImage] = useState(hangout?.image);
  const [open, setOpen] = useState(hangout?.open.toString());
  const [category, setCategory] = useState(hangout?.category);
  const [startDate, setStartDate] = useState(hangout?.startDate);
  const [endDate, setEndDate] = useState(hangout?.endDate);
  const [startTime, setStartTime] = useState(hangout?.startTime);
  const [endTime, setEndTime] = useState(hangout?.endTime);
  const [description, setDescription] = useState(hangout?.description);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    dispatch(getOneHangout(hangoutId));
  }, [dispatch]);

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    const payload = {
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
    const res = await dispatch(editAHangout(hangoutId, payload));
    if (res) {
      const hangoutData = res;
      console.log(hangoutData);
      setErrors(hangoutData);
    }
    if (errors.length == 0) {
      history.push("/home");
    }
  };

  return (
    <div className="new-hangout-form">
      <form onSubmit={handleSubmitEdit} className="hangout-form">
        <ul className="errors-list">
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
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
          placeholder="Image"
        />
        <div className="label-input">Status:</div>
        <div onChange={(e) => setOpen(e.target.value)}>
          <input type="radio" value="true" name="open" /> Open
          <input type="radio" value="false" name="open" /> Not Open
        </div>
        <div className="label-input">Category:</div>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
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
        <div className="label-input">Edit the Description!</div>
        <textarea
          type="text"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          placeholder="Description"
        />
        <button className="submit-button" type="submit">
          Edit
        </button>
      </form>
    </div>
  );
};

export default Edit;
