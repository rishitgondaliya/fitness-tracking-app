import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo/smart fitness and nutrition tracker logo.webp";
import { useLocation, matchPath } from "react-router-dom";
import { ProfileDropDown } from "../auth/ProfileDropDown";

export const Navbar = () => {
  const user = localStorage.getItem("user");
  const location = useLocation();

  const matchRout = (route) => {
    return matchPath({ path: route }, location.pathname);
  };
  return (
    <div className="fixed bg-white shadow w-full z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <a href="/">
          <img
            src={logo}
            alt="logo"
            width={50}
            height={50}
            className="rounded-full"
          />
        </a>

        <nav className="flex space-x-4">
          <Link
            to="/"
            className={`text-gray-700 hover:text-black hover:font-semibold hover:border-b-2 hover:border-b-blue-500 ${
              matchRout("/")
                ? "text-black font-bold border-b-2 border-blue-500"
                : ""
            }`}
          >
            Home
          </Link>
          <Link
            to="/workouts"
            className={`text-gray-700 hover:text-black hover:font-semibold hover:border-b-2 hover:border-b-blue-500 ${
              matchRout("workouts")
                ? "text-black font-bold border-b-2 border-blue-500"
                : ""
            }`}
          >
            Workouts
          </Link>
          <Link
            to="/nutrition-dashboard"
            className={`text-gray-700 hover:text-black hover:font-semibold hover:border-b-2 hover:border-b-blue-500 ${
              matchRout("nutrition-dashboard")
                ? "text-black font-bold border-b-2 border-blue-500"
                : ""
            }`}
          >
            Nutrition
          </Link>
          <Link
            to="/progress-dashboard"
            className={`text-gray-700 hover:text-black hover:font-semibold hover:border-b-2 hover:border-b-blue-500 ${
              matchRout("progress-dashboard")
                ? "text-black font-bold border-b-2 border-blue-500"
                : ""
            }`}
          >
            Progress
          </Link>
          <Link
            to="/news"
            className={`text-gray-700 hover:text-black hover:font-semibold hover:border-b-2 hover:border-b-blue-500 ${
              matchRout("news")
                ? "text-black font-bold border-b-2 border-blue-500"
                : ""
            }`}
          >
            News
          </Link>
        </nav>
        <div className="flex space-x-4">
          {user === null && (
            <Link
              to="/login"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Login
            </Link>
          )}
          {user === null && (
            <Link
              to="/sign-up"
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Sign Up
            </Link>
          )}
          {user != null && <ProfileDropDown />}
        </div>
      </div>
    </div>
  );
};
