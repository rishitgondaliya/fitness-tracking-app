import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import toast from "react-hot-toast";
import { apiConnector } from "../../services/apiConnector";

export const PlanWorkoutModal = ({ setPlanWorkoutModal }) => {
  const user = localStorage.getItem("user");
  const parseUser = JSON.parse(user);
  const [day, setDay] = useState("");
  const [exerciseType, setExerciseType] = useState("");
  const [exerciseName, setExerciseName] = useState("");
  const [duration, setDuration] = useState("");

  const handleSubmit =async (event) => {
    event.preventDefault();
    const userId = parseUser.id;

    const exercisePlanData={dayOfWeek:day,exerciseName,exerciseType,duration,userId}
    console.log(exercisePlanData);
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector(
        "POST",
        "http://localhost:8080/api/exercisePlan/create",
        exercisePlanData
      );
      toast.success("Exercise Plan added");
      toast.dismiss(toastId);
      window.location.reload();
    } catch (error) {
      console.log(error);
      toast.error(`Add Exercise Plan failed: ${error.response.data}`);
      toast.dismiss(toastId);
    }
    setPlanWorkoutModal(false);
  };

  return (
    <div className="fixed inset-0 z-[1000] grid h-screen w-screen place-items-center overflow-auto bg-gray-100 bg-opacity-20 backdrop-blur-sm">
      <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">
        {/* Modal Header */}
        <div className="flex items-center justify-between rounded-t-lg bg-gray-700 p-5 border-b-2 border-gray-400">
          <p className="text-xl font-semibold text-white">
            Plan Your Weekly Workout
          </p>

          <button onClick={() => setPlanWorkoutModal(false)}>
            <RxCross2 className="text-2xl text-white" />
          </button>
        </div>

        <div className="w-full p-6 mx-auto bg-gray-600 rounded-b-lg shadow-md">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-lg font-medium text-white">
                Day of the Week
              </label>
              <select
                value={day}
                onChange={(e) => setDay(e.target.value)}
                className="mt-1 block w-full  border-gray-300 shadow-sm  sm:text-sm rounded-[0.5rem] bg-gray-800 p-[12px]  border-b-[0.5px] text-white"
                required
              >
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Saturday">Saturday</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-lg font-medium text-white">
                Exercise Name
              </label>
              <input
                type="text"
                value={exerciseName}
                placeholder="e.g. bicep curl"
                onChange={(e) => setExerciseName(e.target.value)}
                className="mt-1 block w-full  border-gray-300 shadow-sm  sm:text-sm rounded-[0.5rem] bg-gray-800 p-[12px]  border-b-[0.5px] text-white"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-lg font-medium text-white">
                Exercise Type
              </label>
              <select
                value={exerciseType}
                onChange={(e) => setExerciseType(e.target.value)}
                className="mt-1 block w-full  border-gray-300 shadow-sm  sm:text-sm rounded-[0.5rem] bg-gray-800 p-[12px]  border-b-[0.5px] text-white"
                required
              >
                <option value="Strength">Strength</option>
                <option value="Cardio">Cardio</option>
                <option value="Flexibility">Flexibility</option>
                <option value="Balance">Balance</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-lg font-medium text-white">
                Duration (minutes)
              </label>
              <input
                type="number"
                value={duration}
                placeholder="e.g. 45"
                min={0}
                onChange={(e) => setDuration(e.target.value)}
                className="mt-1 block w-full  border-gray-300 shadow-sm  sm:text-sm rounded-[0.5rem] bg-gray-800 p-[12px]  border-b-[0.5px] text-white"
                required
              />
            </div>

            <div className="flex justify-end gap-5">
              <button
                type="button"
                onClick={() => setPlanWorkoutModal(false)}
                className="mt-6 rounded-[8px] bg-gray-200 py-[8px] px-[12px] font-bold text-black cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="mt-6 rounded-[8px] bg-yellow-500 py-[8px] px-[12px] font-bold text-black cursor-pointer"
              >
                Plan Workout
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
