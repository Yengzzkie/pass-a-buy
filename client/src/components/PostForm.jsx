import { useState } from "react";
import { Button } from "@material-tailwind/react";
import { DialogDefault } from "../components/PostModal";
// import EditCalendarIcon from '@mui/icons-material/EditCalendar';

export default function PostForm() {
  const [postData, setPostData] = useState({
    title: "",
    origin: "",
    destination: "",
    origin_departure: "",
    origin_arrival: "",
    destination_departure: "",
    destination_arrival: "",
    restrictions: "",
    capacity: "",
    itemType: "",
    fee: "",
    additionalDetails: "",
  });

  // Handles input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData({ ...postData, [name]: value });
  };

  // Handles form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (postData.origin === postData.destination) {
      alert("Origin and destination country cannot be the same");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-screen-md mx-auto p-10 bg-white rounded-lg shadow-md"
    >
      <DialogDefault />
      <div className="flex flex-col items-center mb-4 gap-2">
        <h2 className="inline text-2xl font-semibold">Create New Post</h2>
        {/* <EditCalendarIcon /> */}
      </div>

      <div className="w-full">
        {/* Title */}
        <label className="block mb-2">Title</label>
        <input
          type="text"
          name="title"
          placeholder="e.g: Now accepting pasabuy!"
          value={postData.title}
          onChange={handleChange}
          className="w-full p-2 mb-2 border rounded-lg"
          required
        />

        {/* Origin */}
        <label className="block mb-2">Origin country</label>
        <select
          name="origin"
          id="origin"
          className="w-full p-2 mb-2 border rounded-lg"
          onChange={handleChange}
          required
        >
          <option value="" disabled selected>
            Select country
          </option>
          <option value="Canada">Canada</option>
          <option value="Philippines">Philippines</option>
          <option value="United States">United States</option>
        </select>

        {/* Destination */}
        <label className="block mb-2">Destination</label>
        <select
          name="origin"
          id="origin"
          className="w-full p-2 mb-2 border rounded-lg"
          onChange={handleChange}
          required
        >
          <option value="" disabled selected>
            Select country
          </option>
          <option value="Canada">Canada</option>
          <option value="Philippines">Philippines</option>
          <option value="United States">United States</option>
        </select>

        {/* Origin Departure */}
        <label className="block mb-2">Origin Departure</label>
        <input
          type="date"
          name="origin_departure"
          value={postData.origin_departure}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        {/* Origin Arrival */}
        <label className="block mb-2">Origin Arrival</label>
        <input
          type="date"
          name="origin_arrival"
          value={postData.origin_arrival}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        {/* Destination Departure */}
        <label className="block mb-2">Destination Departure</label>
        <input
          type="date"
          name="destination_departure"
          value={postData.destination_departure}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        {/* Destination Arrival */}
        <label className="block mb-2">Destination Arrival</label>
        <input
          type="date"
          name="destination_arrival"
          value={postData.destination_arrival}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
          required
        />
      </div>

      {/* Capacity */}
      <label className="block mb-2">Luggage Max Capacity</label>
      <input
        type="number"
        name="capacity"
        value={postData.capacity}
        onChange={handleChange}
        className="w-full p-2 mb-4 border rounded"
        required
      />
      {/* Item Type */}
      <label className="block mb-2">Item Type</label>
      <input
        type="text"
        name="itemType"
        value={postData.itemType}
        onChange={handleChange}
        className="w-full p-2 mb-4 border rounded"
      />
      {/* Fee */}
      <label className="block mb-2">Fee</label>
      <input
        type="number"
        name="fee"
        value={postData.fee}
        onChange={handleChange}
        className="w-full p-2 mb-4 border rounded"
      />
      {/* Restrictions */}
      <label className="block mb-2">Restrictions</label>
      <textarea
        name="restrictions"
        value={postData.restrictions}
        placeholder="e.g: Meat, dairies, battery..."
        onChange={handleChange}
        className="w-full p-2 mb-4 border rounded"
      />
      {/* Additional Details */}
      <label className="block mb-2">Additional Details</label>
      <textarea
        name="additionalDetails"
        placeholder="e.g: No electronics!"
        value={postData.additionalDetails}
        onChange={handleChange}
        className="w-full p-2 mb-4 border rounded"
      />

      {/* Submit Button */}
      <Button type="submit" variant="gradient" className="w-full mt-4">
        Submit Post
      </Button>
    </form>
  );
}
