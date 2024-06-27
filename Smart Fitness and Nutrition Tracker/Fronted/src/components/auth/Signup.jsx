import React, { useState } from "react";
import signup_image from "../../assets/Auth/undraw_fitness_tracker_3033.svg";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { apiConnector } from "../../services/apiConnector";

export const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { firstName, lastName, email, password, confirmPassword } = formData;

  // Handle input fields, when some value changes
  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords Do Not Match");
      return;
    }

    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector(
        "POST",
        "http://localhost:8080/api/users/register",
        formData
      );      
      toast.success("Signup Successful!!");
      toast.dismiss(toastId);
      navigate("/login");
    } catch(error){
      if (error.response) {
        // Server responded with an error status code (4xx or 5xx)
        toast.error(`Signup Failed: ${error.response.data}`);
        toast.dismiss(toastId);
      } else if (error.request) {
        // The request was made but no response was received
        toast.error("No response from server. Please try again later.");
        toast.dismiss(toastId);
      } else {
        // Something happened in setting up the request that triggered an error
        toast.error("Error during signup. Please try again later.");
        toast.dismiss(toastId);
      }
    }
    // Reset
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="mt-28 mb-10 flex justify-center items-center gap-x-32">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-2 text-center">Welcome</h2>
        <p className="text-gray-600 mb-6 text-center">
          Start tracking your fitness and nutrition today
        </p>

        <form onSubmit={handleOnSubmit}>
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-gray-700">
              First Name<sup className="text-red-700">*</sup>
            </label>
            <input
              type="text"
              name="firstName"
              className="w-full p-2 border border-gray-300 rounded mt-1"
              placeholder="Enter your name"
              value={firstName}
              onChange={handleOnChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="lastName" className="block text-gray-700">
              Last Name<sup className="text-red-700">*</sup>
            </label>
            <input
              type="text"
              name="lastName"
              className="w-full p-2 border border-gray-300 rounded mt-1"
              placeholder="Enter your last name"
              value={lastName}
              onChange={handleOnChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email<sup className="text-red-700">*</sup>
            </label>
            <input
              type="email"
              name="email"
              className="w-full p-2 border border-gray-300 rounded mt-1"
              placeholder="Enter your email"
              value={email}
              onChange={handleOnChange}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700">
              Password<sup className="text-red-700">*</sup>
            </label>
            <input
              type="password"
              name="password"
              className="w-full p-2 border border-gray-300 rounded mt-1"
              placeholder="Enter your password"
              value={password}
              onChange={handleOnChange}
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-gray-700">
              Confirm Password<sup className="text-red-700">*</sup>
            </label>
            <input
              type="password"
              name="confirmPassword"
              className="w-full p-2 border border-gray-300 rounded mt-1"
              placeholder="Enter your password"
              value={confirmPassword}
              onChange={handleOnChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Create Account
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="mt-2 flex gap-x-2 items-center justify-center">
            Already have an account?
            <Link to="/login" className="underline text-blue-500">
              Login
            </Link>
          </p>
        </div>
      </div>
      <div>
        <img
          src={signup_image}
          alt="signupImage"
          className="object-cover w-[400px] h-[300px]"
        />
      </div>
    </div>
  );
};
