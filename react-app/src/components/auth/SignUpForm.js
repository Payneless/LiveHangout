import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { signUp } from "../../store/session";
import "./SignUpForm.css";

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [discordHandle, setDiscordHandle] = useState("");
  const [fName, setFName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [bool, setBool] = useState(false);
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const onSignUp = async (e) => {
    console.log("HELLO!");
    e.preventDefault();
    if (!/\d|\w+#\d{4}/gi.test(discordHandle)) {
      errors.push(" : Please provide a valid Discord handle");
    }
    if (fName.length < 1) {
      errors.push(" : Please enter a first name");
    }
    if (email.length < 8) {
      errors.push(" : Please provide a valid email");
    }
    if (password.length < 8) {
      errors.push(" : Password must be at least 8 characters");
    }
    if (password === repeatPassword) {
      const data = await dispatch(
        signUp(discordHandle, fName, profilePhoto, email, password)
      );
      if (data) {
        setErrors(data);
      } else {
        history.push("/");
      }
    } else {
      setErrors([" : Passwords must match"]);
    }
  };

  const updatefName = (e) => {
    setFName(e.target.value);
  };

  const updateDiscordHandle = (e) => {
    setDiscordHandle(e.target.value);
  };

  const updateProfilePhoto = (e) => {
    setProfilePhoto(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/home" />;
  }

  return (
    <form className={`signup-form signup-form-${bool}`}>
      <div className="login-errors">
        {errors.map((error, ind) => (
          <div key={ind}>{error.split(":")}</div>
        ))}
      </div>
      <div className="input">
        <label>First Name: </label>
        <input
          type="text"
          name="username"
          onChange={updatefName}
          value={fName}
        ></input>
      </div>
      <div className="input">
        <label>Discord Handle: </label>
        <input
          type="text"
          name="discord-handle"
          onChange={updateDiscordHandle}
          value={discordHandle}
        ></input>
      </div>
      <div className="input">
        <label>Profile Photo: </label>
        <input
          type="text"
          name="profile-photo"
          onChange={updateProfilePhoto}
          value={profilePhoto}
        ></input>
      </div>
      <div className="input">
        <label>Email: </label>
        <input
          type="text"
          name="email"
          onChange={updateEmail}
          value={email}
        ></input>
      </div>
      <div className="input">
        <label>Password: </label>
        <input
          type="password"
          name="password"
          onChange={updatePassword}
          value={password}
        ></input>
      </div>
      <div className="input">
        <label>Confirm Password: </label>
        <input
          type="password"
          name="repeat_password"
          onChange={updateRepeatPassword}
          value={repeatPassword}
        ></input>
      </div>
      <button className="sign-up-button" onClick={onSignUp}>
        Sign Up
      </button>
    </form>
  );
};

export default SignUpForm;
