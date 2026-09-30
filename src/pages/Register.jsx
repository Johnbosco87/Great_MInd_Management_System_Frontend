import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post(
        "https://schoolsystem-tpvl.onrender.com/api/register/",
        {
          username,
          email,
          password,
        }
      );

      setMessage(response.data.message);

      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (error) {
      setError(
        error.response?.data?.error ||
        "Registration failed. Please try again."
      );
    }
  };

  return (
    <div>
      <h1>Great Mind Registration</h1>

      {error && <p>{error}</p>}
      {message && <p>{message}</p>}

      <form onSubmit={handleRegister}>

        <div>
          <label>Username</label>

          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Email</label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Password</label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Confirm Password</label>

          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">
          Register
        </button>

      </form>

      <p>
        Already have an account?{" "}
        <Link to="/login">Login</Link>
      </p>

    </div>
  );
}

export default Register;