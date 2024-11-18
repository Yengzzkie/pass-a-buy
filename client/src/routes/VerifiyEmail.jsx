import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function VerifyEmail() {
  const { token } = useParams();
  const [error, setError] = useState("");

  async function verifyEmailToken() {
    try {
      await axios.get(`http://localhost:8080/verify-email?token=${token}`);
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