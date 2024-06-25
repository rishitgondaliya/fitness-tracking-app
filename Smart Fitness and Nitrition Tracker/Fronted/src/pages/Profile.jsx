import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { apiConnector } from "../services/apiConnector";
import { MdDelete } from "react-icons/md";


export const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [goalName, setGoalName] = useState("");
  const [goalDescription, setGoalDescription] = useState("");
  const [goalData,setGoalData]=useState([]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setGoalName(value);
    } else if (name === "description") {
      setGoalDescription(value);
    }
  };

  const fetchGoalData=async()=>{
    const toastId=toast.loading("Loading...");
    try {
      const response=await apiConnector("GET",`http://localhost:8080/api/goals/${user.id}`)
      setGoalData(response.data);
      toast.dismiss(toastId);
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
      toast.dismiss(toastId);
    }
  }

  useEffect(()=>{
    fetchGoalData();
  },[])
  // Handle form submission
  const handleGoalSubmit = async (e) => {
    e.preventDefault();

    // Prepare data for API call
    const goalData = {
      name: goalName,
      description: goalDescription,
    };
    const toastId = toast.loading("Loading");
    try {
      const response = await apiConnector(
        "POST",
        `http://localhost:8080/api/goals/add/${user.id}`,
        goalData
      );
      
      if(response){
        toast.success("Goal Set Successfully!")
        toast.dismiss(toastId);
        window.location.reload();
      }
    } catch (error) {
      toast.error("You can set one goal at a time");
      toast.dismiss(toastId);

    }

    setGoalName("")
    setGoalDescription("")
  };

  const handleDeleteGoal=async()=>{
    const toastId=toast.loading("Loading...");
    try {
      const response=await apiConnector("DELETE",`http://localhost:8080/api/goals/${user.id}`)
      toast.success("Goal Deleted");
      setGoalData([]);
      toast.dismiss(toastId)
    } catch (error) {
      toast.error(error.message);
      toast.dismiss(toastId)
    }
  }

  return (
    <div className="p-6 mt-20 flex flex-col items-center">
      <h1 className="text-2xl font-bold text-center mb-4">Your Profile</h1>
      <p className="text-center mb-8">
        Manage your personal information and preferences.
      </p>

      <div className="bg-white shadow-md p-4 rounded mb-4 w-full max-w-2xl">
        <h2 className="text-xl font-bold mb-4">Personal Information</h2>
        <div className="mb-4">
          <label className="block font-bold mb-1">First Name:</label>
          <p className="p-2 ">{user.firstName}</p>
        </div>
        <div className="mb-4">
          <label className="block font-bold mb-1">Last Name:</label>
          <p className="p-2 ">{user.lastName}</p>
        </div>
        <div className="mb-4">
          <label className="block font-bold mb-1">Email:</label>
          <p className="p-2 ">{user.email}</p>
        </div>
      </div>

{
  <div className="bg-white shadow-md p-4 rounded mb-4 w-full max-w-2xl">
  <h2 className="text-xl font-bold mb-4">Your Goal</h2> 
    <div  className="flex items-center justify-between">
    <div>
      <h3 className="">Current Goal</h3>
      <p>Name: {goalData?.name || "Set your goal name"}</p>
      <p>Description: {goalData?.description || "Set your goal description"}</p>
    </div>
    <button onClick={() => handleDeleteGoal()}>
            <MdDelete className="text-3xl hover:text-gray-700 cursor-pointer" />
          </button>
    </div>
    </div>
}

      {goalData.length===0 &&
        <div className="bg-white shadow-md p-4 rounded mb-4 w-full max-w-2xl">
        <h2 className="text-xl font-bold mb-4">Set Your Goal</h2>
          
  
          <form onSubmit={handleGoalSubmit}>
            <label htmlFor="goal">
              Goal Name <sup className=" text-red-700"> *</sup>
            </label>
            <div className="flex flex-col gap-5">
              <input
                type="text"
                name="name"
                id="name"
                value={goalName}
                onChange={handleChange}
                placeholder="Your Goal"
                className="w-full p-1"
                required
              />
  
              <label htmlFor="description">Description <sup className="text-red-700">*</sup></label>
              <input
                type="text"
                name="description"
                id="description"
                value={goalDescription}
                onChange={handleChange}
                placeholder="Your Goal"
                className="w-full p-1"
                required
              />
              <button
                type="submit"
                className="rounded-[8px] bg-yellow-500 py-[5px] px-[10px] font-bold text-black cursor-pointer flex justify-end items-end w-fit"
              >
                Set Goal
              </button>
            </div>
          </form>
      </div>
      }
    </div>
  );
};
