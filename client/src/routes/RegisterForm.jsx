import { useState } from "react";
import { Button, Checkbox, Label, TextInput, Select } from "flowbite-react";
import { Link } from "react-router-dom";
import { IoIosMail } from "react-icons/io";
import { FaKey } from "react-icons/fa";
import { FaMobileAlt } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaFlagUsa } from "react-icons/fa6";
import { FaTreeCity } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useToast } from "../utils/useToast";
import axios from "axios";

export default function RegisterForm() {
  const { notifySuccess } = useToast();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    contact: "",
    city: "",
    country: ""
  });

  async function handleSubmit(e) {
    e.preventDefault();

    if (formData.password !== formData.repeatPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const registerData = await axios.post("http://localhost:8080/users/register", formData);
      console.log("Successfully registered user:", registerData);
      notifySuccess("Registration successful! Check your email for verification link");
      navigate("/login")
    } catch (error) {
      setError(error?.response?.data?.message);
      console.error("Registration failed:", error);
    }
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    console.log(formData);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="registration-form flex flex-col max-w-lg gap-4 border p-6 mt-4 mx-auto shadow-md shadow-[#ccc] rounded-md"
    >
      {/* FIRST BLOCK */}
      <div>
        {/* FIRST NAME */}
        <div>
          <div className="mb-2 block">
            <span className="text-red-500">*</span>
            <Label
              className="text-[#fff]"
              htmlFor="firstName"
              value="First Name"
            />
          </div>
          <TextInput
            id="firstName"
            type="text"
            name="firstName"
            icon={FaUser}
            value={formData.firstName}
            onChange={handleInputChange}
            required
            shadow
          />
        </div>
        {/* LAST NAME */}
        <div>
          <div className="mb-2 block">
            <span className="text-red-500">*</span>
            <Label
              className="text-[#fff]"
              htmlFor="lastName"
              value="Last Name"
            />
          </div>
          <TextInput
            id="lastName"
            type="text"
            name="lastName"
            icon={FaRegUser}
            value={formData.lastName}
            onChange={handleInputChange}
            required
            shadow
          />
        </div>

        {/* EMAIL */}
        <div>
          <div className="mb-2 block">
            <span className="text-red-500">*</span>
            <Label className="text-[#fff]" htmlFor="email2" value="Email" />
          </div>
          <TextInput
            id="email2"
            type="email"
            name="email"
            value={formData.email}
            placeholder="you@domain.com"
            icon={IoIosMail}
            required
            shadow
            onChange={handleInputChange}
          />
        </div>
        {/* PASSWORD */}
        <div>
          <div className="mb-2 block">
            <span className="text-red-500">*</span>
            <Label
              className="text-[#fff]"
              htmlFor="password"
              value="Password"
            />
          </div>
          <TextInput
            id="password"
            type="password"
            name="password"
            value={formData.password}
            icon={FaKey}
            onChange={handleInputChange}
            required
            shadow
          />
        </div>
        {/* REPEAT PASSWORD */}
        <div>
          <div className="mb-2 block">
            <span className="text-red-500">*</span>
            <Label
              className="text-[#fff]"
              htmlFor="repeat-password"
              value="Repeat password"
            />
          </div>
          <TextInput
            id="repeat-password"
            type="password"
            name="repeatPassword"
            icon={FaKey}
            onChange={handleInputChange}
            required
            shadow
          />
        </div>
      </div>

      {/* SECOND BLOCK */}
      <div>
        {/* MOBILE */}
        <div>
          <div className="mb-2 block">
            <span className="text-red-500">*</span>
            <Label className="text-[#fff]" htmlFor="contact" value="Mobile" />
          </div>
          <TextInput
            id="contact"
            type="tel"
            name="contact"
            value={formData.contact}
            icon={FaMobileAlt}
            onChange={handleInputChange}
            required
            shadow
          />
        </div>
      </div>
      {/* CITY */}
      <div>
          <div className="mb-2 block">
            <span className="text-red-500">*</span>
            <Label
              className="text-[#fff]"
              htmlFor="city"
              value="Province / City"
            />
          </div>
          <TextInput
            id="city"
            type="text"
            name="city"
            value={formData.city}
            icon={FaTreeCity}
            onChange={handleInputChange}
            required
            shadow
          />
        </div>
      {/* COUNTRY */}
      <div className="max-w-md">
        <div className="mb-2 block">
          <Label
            className="text-[#fff]"
            htmlFor="country"
            value="Select your country"
          />
        </div>
        <Select id="country" name="country" value={formData.country} icon={FaFlagUsa} onChange={handleInputChange} required>
          <option value="">Select Country</option>
          <option>Canada</option>
          <option>United States</option>
          <option>Philippines</option>
        </Select>
      </div>

      <div>
        <div className="flex items-center gap-2">
          <Checkbox id="agree" />
          <Label htmlFor="agree" className="flex text-[#fff]">
            I agree with the&nbsp;
            <Link
              to={"/"}
              className="text-cyan-600 underline dark:text-cyan-500"
            >
              terms and conditions.
            </Link>
          </Label>
        </div>
        <Button type="submit">Register new account</Button>
      </div>
      <p className="text-red-500 italic">{error}</p>
    </form>
  );
}
