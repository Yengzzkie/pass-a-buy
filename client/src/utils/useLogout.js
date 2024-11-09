import axios from "axios";
import { useUserAuth } from "../stores/useDataStore";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const navigate = useNavigate();
  const { setAuth } = useUserAuth();

  async function handleLogout() {
    try {
      const response = await axios.post(
        "http://localhost:8080/logout",
        {},
        { withCredentials: true }
      );

      if (response.status === 200) {
        setAuth(false);
        localStorage.removeItem("userID");
        localStorage.removeItem("auth");
        navigate("/login");
      } else {
        console.log("Logout unsuccessful:", response.data);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  }

  return { handleLogout };
};
