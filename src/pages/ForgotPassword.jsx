import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    try {
      const response = await axios.post(
        "https://schoolsystem-tpvl.onrender.com/api/forgot-password/",
        {
          email: email,
        }
      );

      setMessage(response.data.message);
    } catch (error) {
      setError(
        error.response?.data?.error ||
        "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div>
      <h1>Forgot Password</h1>

      <p>Enter your email address to reset your password.</p>

      {message && <p>{message}</p>}
      {error && <p>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <button type="submit">
          Send Reset Link
        </button>
      </form>

      <p>
        <Link to="/login">Back to Login</Link>
      </p>
    </div>
  );
}

export default ForgotPassword;