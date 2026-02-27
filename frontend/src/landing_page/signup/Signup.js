import React, { useState } from "react";
import axios from "axios";
import "../../index.css";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userExistance, setUserExistance] = useState(false);

  const closePopup = () => {
    setUserExistance(false);
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://127.0.0.1:3002/auth/signup",
        { email, username, password },
        { withCredentials: true }
      );

      // ✅ SAME LOGIC AS YOUR FIRST CODE
      if (res.status === 201) {
        setTimeout(() => {
          window.location.href = process.env.REACT_APP_DASHBOARD_URL;
        }, 500);
      } 
      else if (res.status === 202) {
        setUserExistance(true);
      }

    } catch (error) {
      console.error("Signup failed", error);
    }

    setEmail("");
    setUsername("");
    setPassword("");
  };

  return (
    <div className="signup-container">
      <img
        src="/media/images/logo.svg"
        alt="Zerodha Logo"
        className="signup-logo"
      />

      <h2>Open a Zerodha account</h2>
      <p className="subtitle">
        Modern platforms and apps, ₹0 investments, and flat ₹20 intraday and
        F&O trades.
      </p>

      <div className="signup-box">
        <form onSubmit={handleSignup}>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Username</label>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="signup-btn" type="submit">
            Continue
          </button>
        </form>

        <p className="terms">
          By proceeding, you agree to the Zerodha
          <span> terms & privacy policy</span>
        </p>
      </div>

      {/* ✅ POPUP SAME AS FIRST CODE */}
      {userExistance && (
        <div className="popup">
          <div className="popup-content">
            <p>The user already exists! Please log in.</p>
            <button onClick={closePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;




