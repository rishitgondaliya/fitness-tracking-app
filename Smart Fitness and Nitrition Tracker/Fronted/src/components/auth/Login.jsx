import { React, useState } from "react";
import { Link } from "react-router-dom";
import login_image from "../../assets/Auth/undraw_healthy_lifestyle_re_ifwg.svg";
import { apiConnector } from "../../services/apiConnector";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email : "",
    password : ""
  });
  
  const { email, password } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector(
        "POST",
        "http://localhost:8080/api/users/login",
        formData
      );
      localStorage.setItem("user", JSON.stringify(response.data));
      toast.success("Login Successful!!");
      toast.dismiss(toastId);
      navigate("/");

    } catch (error) {
      if (error.response) {
        // Server responded with an error status code (4xx or 5xx)
        console.log(error);
        toast.error(`Login Failed: ${error.response.data}`);
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
  };
  return (
    <div className="flex  justify-center items-center mt-28 mb-10 gap-x-32">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-2 text-center">Welcome</h2>
        <p className="text-gray-600 mb-6 text-center">
          Start tracking your fitness and nutrition today
        </p>
        <form onSubmit={handleOnSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email <sup className="text-red-700">*</sup>
            </label>
            <input
              type="email"
              id="email"
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
              id="password"
              name="password"
              value={password}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              placeholder="Enter your password"
              onChange={handleOnChange}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Log In
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="mt-2 flex gap-x-2 items-center justify-center">
            Don't have an account?
            <Link to="/sign-up" className="underline text-blue-500">
              Sign Up
            </Link>
          </p>
        </div>
      </div>

      <div className="rounded-md">
        <img
          src={login_image}
          alt="login_image"
          className="w-[400px] h-[300px]"
        />
      </div>
    </div>
  );
};
