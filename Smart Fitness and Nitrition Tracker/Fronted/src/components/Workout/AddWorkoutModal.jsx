import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { apiConnector } from "../../services/apiConnector";

export const AddWorkoutModal = ({ setAddWorkoutModal }) => {
  const navigate = useNavigate();
  const [exerciseName, setExerciseName] = useState("");
  const [duration, setDuration] = useState("");
  const [caloriesBurned, setCaloriesBurned] = useState("");

  const handleSubmit = async (event) => {
    const user = localStorage.getItem("user");
    const parseUser = JSON.parse(user);
    event.preventDefault();

    // Here we would typically send the data to the backend or update the context/state in the parent component

    const workoutData = { name: exerciseName, duration, caloriesBurned };

    const userId = parseUser.id;
    const newWorkoutData = { ...workoutData, userId: userId };

    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector(
        "POST",
        "http://localhost:8080/api/exercises/add",
        newWorkoutData
      );
      console.log(response.data);
      toast.success("workout added");
      toast.dismiss(toastId);
      window.location.reload();
    } catch (error) {
      console.log(error);
      toast.error(`Add Workout failed: ${error.response.data}`);
      toast.dismiss(toastId);
    }
    setAddWorkoutModal(false);
  };

  return (
    <div className="fixed inset-0 z-[1000] grid h-screen w-screen place-items-center overflow-auto bg-gray-100 bg-opacity-20 backdrop-blur-sm">
      <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">
        {/* Modal Header */}
        <div className="flex items-center justify-between rounded-t-lg bg-gray-700 p-5 border-b-2 border-gray-400">
          <p className="text-xl font-semibold text-white">Add Workout</p>

          <button onClick={() => setAddWorkoutModal(false)}>
            <RxCross2 className="text-2xl text-white" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 bg-gray-600 rounded-b-lg">
          <form
            onSubmit={handleSubmit}
            className="mt-6 flex flex-col items-center"
          >
            <div className="w-full flex flex-col gap-4">
              <div>
                <label className="block text-lg font-medium text-white">
                  Exercise Name
                </label>
                <input
                  type="text"
                  value={exerciseName}
                  placeholder="e.g. Morning Running"
                  onChange={(e) => setExerciseName(e.target.value)}
                  className="mt-1 block w-full  border-gray-300 shadow-sm  sm:text-sm rounded-[0.5rem] bg-gray-800 p-[12px]  border-b-[0.5px] text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-lg font-medium text-white">
                  Duration (minutes)
                </label>
                <input
                  type="number"
                  value={duration}
                  min={0}
                  placeholder="e.g. 45"
                  onChange={(e) => setDuration(e.target.value)}
                  className="mt-1 block w-full  border-gray-300 shadow-sm  sm:text-sm rounded-[0.5rem] bg-gray-800 p-[12px]  border-b-[0.5px] text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-lg font-medium text-white">
                  Calories Burned(Kcal)
                </label>
                <input
                  type="number"
                  value={caloriesBurned}
                  placeholder="e.g. 300"
                  min={0}
                  onChange={(e) => setCaloriesBurned(e.target.value)}
                  className="mt-1 block w-full  border-gray-300 shadow-sm  sm:text-sm rounded-[0.5rem] bg-gray-800 p-[12px]  border-b-[0.5px] text-white"
                  required
                />
              </div>
            </div>

            <div className="mt-6 flex w-11/12 justify-end gap-x-2">
              <button
                type="button"
                onClick={() => setAddWorkoutModal(false)}
                className="mt-6 rounded-[8px] bg-gray-200 py-[8px] px-[12px] font-bold text-black cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="mt-6 rounded-[8px] bg-yellow-500 py-[8px] px-[12px] font-bold text-black cursor-pointer"
              >
                Add Workout
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
