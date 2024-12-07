import "../index.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserAuth, useUserData } from "../stores/useDataStore";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
  Spinner
} from "@material-tailwind/react";


function App() {
  const API = import.meta.env.VITE_NODE_ENV === 'development' ? 'http://localhost:8080' : import.meta.env.VITE_API_URL
  const { setAuth } = useUserAuth();
  const { setUserData } = useUserData();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    try {
      const response = await axios.post(
        `${API}/login`,
        { email: formData.email, password: formData.password },
        { withCredentials: true }
      );

      if (response.status !== 200) {
        console.log(response.data);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Save user ID and isAuthentication status to localstorage from response
      // so it can be accessible across pages specially the navbar so that
      // pages can render proper state accordingly
      setAuth(true);
      localStorage.setItem("userID", JSON.stringify({ id: response.data.id }));
      localStorage.setItem("auth", JSON.stringify({ isAuthenticated: true }));
      
      // fetch the user's data after succesful authentication for Dashboard's fast rendering
      // I know it is not ideal, just in case the app grows bigger and the user data become more expensive
      // to fetch, I want to render it here after successful login
      const user = await axios.get(
        `${API}/users/myprofile/${response.data.id}`,
        { withCredentials: true }
      );

      setUserData(user.data);

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.message
        : error.message;
      console.error("Error logging in:", errorMessage);
      setError(errorMessage);
      throw error;
    }finally {
      setIsLoading(false);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div className="flex justify-center items-center h-full w-full h-screen">
      <form
        onSubmit={handleLogin}
        className="flex text-white max-w-md flex-col w-full p-2 m-auto transk"
      >
        <Card className="w-96">
      <CardHeader variant="gradient" color="gray" className="blue-gradient mb-4 grid h-28 place-items-center">
        <Typography variant="h3" color="white">
          Pass-A-Buy
        </Typography>
      </CardHeader>
      <CardBody className="flex flex-col gap-4">
        <Input onChange={handleChange} label="Email" size="lg"  type="email" name="email" required />
        <Input onChange={handleChange} label="Password" size="lg" type="password" name="password" required />
        <p className="italic text-red-500 text-sm">{error}</p> 
        <div className="-ml-2.5">
          <Checkbox label="Remember Me" />
        </div>
      </CardBody>
      <CardFooter className="pt-0">
        <Button variant="gradient" type="submit" className="blue-gradient" fullWidth>
          {!isLoading ? "Sign In" : <Spinner color="blue" className="mx-auto" />}
        </Button>
        <p className="text-center">or</p>
        <Button className="flex items-center gap-3 mx-auto" size="lg" variant="outlined" color="blue-gray" >
        <img src="https://docs.material-tailwind.com/icons/google.svg" alt="metamask" className="h-6 w-6" />
        Continue with Google
      </Button>
        <Typography variant="small" className="mt-6 flex justify-center">
          Don&apos;t have an account?
          <Typography onClick={() => navigate("/register")} variant="small" color="blue-gray" className="ml-1 font-bold cursor-pointer underline">
            Sign up
          </Typography>
        </Typography>
      </CardFooter>
    </Card>
      </form>
    </div>
  );
}

export default App;
