import '../index.css';
import { useContext, useState,  } from 'react';
import axios from 'axios';
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useNavigate } from 'react-router-dom';
import { UserContext, UserProfileContext, LoginStatusContext } from '../context/context';

function App() {
  const { setUserCredentials } = useContext(UserContext);
  const { setUserProfile } = useContext(UserProfileContext);
  const { setIsLoggedIn } = useContext(LoginStatusContext);
  const [ error, setError ] = useState("");
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();


// Handle form submission
const handleLogin = async (event) => {
  event.preventDefault();
  
  try {
    // Send login request with axios
    const response = await axios.post('http://localhost:8080/login', {
      email: formData.email,
      password: formData.password,
    }, {
      withCredentials: true,
    });

    // Check response status
    if (response.status !== 200) {
      console.log(response.data);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Save user ID from response
    setUserCredentials(response.data.id);

    // Fetch user data with the saved ID from credentials
    const userData = await axios.get(`http://localhost:8080/users/myprofile/${response.data.id}`, { withCredentials: true });
    setUserProfile(userData.data);
    setIsLoggedIn(true);

    // Redirect to home after a delay
    setTimeout(() => {
      navigate('/home');
    }, 1000);

  } catch (error) {
    // Check if error.response exists before accessing data
    const errorMessage = error.response ? error.response.data.message : error.message;
    console.error('Error logging in:', errorMessage);
    setError(errorMessage);
    throw error;
  }
};


// async function handleLogout() {
//   try {
//     const response = await axios.post(
//       'http://localhost:8080/logout',
//       {},
//       { withCredentials: true }
//     );

//     if (response.status === 200) {
//       console.log("Logged out successfully");
//     } else {
//       console.log("Logout unsuccessful:", response.data);
//     }
//   } catch (error) {
//     console.error("Error during logout:", error);
//   }
// }

  // Handle changes in the form fields
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  return (
    <div className="flex justify-center items-center h-full w-full">
      <form onSubmit={handleLogin} className="flex text-white max-w-md flex-col gap-4 border w-full p-2 m-auto translate-y-1/2 shadow-md shadow-[#ccc] rounded-md">
        <div>
          <Label className="text-white" htmlFor="email" value="Email" />
          <TextInput id="email" name="email" type="email" placeholder="your@email.com" required onChange={handleChange} />
        </div>
        <div>
          <Label className="text-white" htmlFor="password" value="Password" />
          <TextInput id="password" name="password" type="password" required onChange={handleChange} />
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="remember" />
          <Label htmlFor="remember" className="text-white">Remember me</Label>
        </div>
        <Button type="submit">Login</Button>
        <p className='italic text-red-500 text-sm p-2'>{error}</p>
      </form>
    </div>
  );
}

export default App;
