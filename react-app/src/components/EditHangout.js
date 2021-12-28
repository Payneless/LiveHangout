import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { editAHangout } from "../store/hangouts";
import { getOneHangout } from "../store/hangouts";

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
    await dispatch(editAHangout(hangoutId, payload)).catch(async (res) => {
      const hangoutData = await res.json();
      if (hangoutData && hangoutData.errors) setErrors(hangoutData.errors);
    });
    history.push("/home");
  };

  return (
    <div className="new-hangout-form">
      <form onSubmit={handleSubmitEdit} className="hangout-form">
        <ul className="errors-list">
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          placeholder="Title"
        />
        <input
          type="text"
          onChange={(e) => setLink(e.target.value)}
          value={link}
          placeholder="Discord Link"
        />
        <input
          type="text"
          onChange={(e) => setImage(e.target.value)}
          value={image}
          placeholder="Image"
        />
        <div onChange={(e) => setOpen(e.target.value)}>
          <input type="radio" value="true" name="open" /> Open
          <input type="radio" value="false" name="open" /> Not Open
        </div>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Chill">Chill</option>
          <option value="Watch Party">Watch Party</option>
          <option value="Concert">Concert</option>
          <option value="Workshop">Workshop</option>
          <option value="AMA">AMA</option>
        </select>
        <input
          type="date"
          onChange={(e) => setStartDate(e.target.value)}
          value={startDate}
          placeholder="date"
        />
        Start Date
        <input
          type="date"
          onChange={(e) => setEndDate(e.target.value)}
          value={endDate}
          placeholder="date"
        />
        End Date
        <input
          type="time"
          onChange={(e) => setStartTime(e.target.value)}
          value={startTime}
          placeholder="time"
        />
        Start Time
        <input
          type="time"
          onChange={(e) => setEndTime(e.target.value)}
          value={endTime}
          placeholder="time"
        />
        End Time
        <textarea
          type="text"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          placeholder="Description"
        />
        Edit the Description!
        <button className="submit-button" type="submit">
          Edit
        </button>
      </form>
    </div>
  );
};

export default Edit;
