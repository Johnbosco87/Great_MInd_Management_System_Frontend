import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function ResetPassword() {
  const { uid, token } = useParams();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post(
        `https://schoolsystem-tpvl.onrender.com/api/reset-password/${uid}/${token}/`,
        {
          password: password,
        }
      );

      setMessage(response.data.message);

      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (error) {
      setError(
        error.response?.data?.error ||
        "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div>
      <h1>Reset Password</h1>

      {error && <p>{error}</p>}

      {message && <p>{message}</p>}

      <form onSubmit={handleReset}>

        <div>
          <label>New Password</label>

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
          Reset Password
        </button>

      </form>
    </div>
  );
}

export default ResetPassword;