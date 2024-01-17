import React, { useState, useEffect } from "react";
import axios from "axios";
import "../style3.css";
import Studentdash from "./Studentdash";

import BannerBackground from "../Assets/home-banner-background.png";
import { useContext } from "react";
import { AppContext } from "./AppContext";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [exitmark, setExitExamMarks] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [error, setError] = useState(null);
  const { enrolled, setEnrolled,userId, setUserId } = useContext(AppContext);
  // console.log(enrolled,"click")
  const handleSignup = async () => {
    try {
      const response = await axios.post("http://localhost:3000/signup", {
        username,
        email,
        password,
        phonenumber,
        exitmark, // Assuming the API expects 'exitmark' instead of 'exitExamMarks'
        createdAt: new Date().toISOString(), // You may want to adjust the format based on your backend expectations
      });
      console.log(response.data);

      if (response.data.success) {
        setIsRegistered(true);
        setEnrolled(true);
        // setUserId(response.data.user._id);
       

// Store the token and user ID in local storage

localStorage.setItem('userId', response.data.user._id);

      } else {
        setError(response.data.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setError("An error occurred during signup. Please try again later.");
    }
  };

  useEffect(() => {
    if (isRegistered) {
      // Additional logic for handling registered state, if needed
    }
  }, [isRegistered]);

  return (
    <div className="regdesign container mt-5">
      <div className="home-bannerImage-container">
        <img src={BannerBackground} alt="Banner Background" />
      </div>
      <div>
        {isRegistered ? (
          <div>
            <p>Registration successful! Welcome, {username}!</p>
            <Studentdash />
          </div>
        ) : (
          <div>
            <div className="materialContainer  mt-5">
              <div className="box1">
                <div className="title">Signup</div>

                <label className="input">
                  Username:
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </label>
                <br />
                <label className="input">
                  Email:
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>
                <br />
                <label className="input">
                  Password:
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </label>
                <br />
                <label className="input">
                  Phone Number:
                  <input
                    type="text"
                    value={phonenumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </label>
                <br />
                <label className="input">
                  Exit Exam Marks:
                  <input
                    type="number"
                    value={exitmark}
                    onChange={(e) => setExitExamMarks(e.target.value)}
                  />
                </label>

                <div className="button login">
                  <button onClick={handleSignup}>
                    <span>Signup</span> <i className="fa fa-check"></i>
                  </button>
                </div>

                {error && <p className="error-message">{error}</p>}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Signup;
