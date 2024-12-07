import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function VerifyEmail() {
  const API = import.meta.env.VITE_NODE_ENV === 'development' ? 'http://localhost:8080' : import.meta.env.VITE_API_URL
  const { token } = useParams();
  const [error, setError] = useState("");

  async function verifyEmailToken() {
    try {
      await axios.get(`${API}/verify-email?token=${token}`);
      console.log("Email verification successful");
    } catch (error) {
      console.error("Email verification failed", error);
      setError(error);
    }
  }

  useEffect(() => {
    verifyEmailToken();
  }, [token]);

  return (
    <div>
      {error ? "Expired verification link" : "Email verification successful"}
      <div>Return to <Link to="/dashboard"><button>Dashboard</button></Link></div>
    </div>
  );
}

export default VerifyEmail;