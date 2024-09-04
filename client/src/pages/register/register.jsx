import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./register.css";

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
    city: "",
    country: "",
    phone: "",
    img: "",
    isAdmin: false,
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/api/auth/register", credentials);
      navigate("/login");
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="register">
      <div className="rContainer">
        <div className="rInputWrapper">
          <i className="fas fa-user"></i>
          <input
            type="text"
            placeholder="Username"
            id="username"
            onChange={handleChange}
            className="rInput"
          />
        </div>
        <div className="rInputWrapper">
          <i className="fas fa-envelope"></i>
          <input
            type="email"
            placeholder="Email"
            id="email"
            onChange={handleChange}
            className="rInput"
          />
        </div>
        <div className="rInputWrapper">
          <i className="fas fa-lock"></i>
          <input
            type="password"
            placeholder="Password"
            id="password"
            onChange={handleChange}
            className="rInput"
          />
        </div>
        <div className="rInputWrapper">
          <i className="fas fa-city"></i>
          <input
            type="text"
            placeholder="City"
            id="city"
            onChange={handleChange}
            className="rInput"
          />
        </div>
        <div className="rInputWrapper">
          <i className="fas fa-flag"></i>
          <input
            type="text"
            placeholder="Country"
            id="country"
            onChange={handleChange}
            className="rInput"
          />
        </div>
        <div className="rInputWrapper">
          <i className="fas fa-phone"></i>
          <input
            type="text"
            placeholder="Phone"
            id="phone"
            onChange={handleChange}
            className="rInput"
          />
        </div>
       
        <button onClick={handleClick} className="rButton">
          Register
        </button>
        <div className="rLogin">
          <span>Already have an account? </span>
          <Link to="/login" className="rLink">Login</Link>
        </div>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
};

export default Register;
