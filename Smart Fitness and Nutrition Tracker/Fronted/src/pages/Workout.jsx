import React, { useState, useEffect } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { apiConnector } from "../services/apiConnector";
import toast from "react-hot-toast";
import { AddWorkoutModal } from "../components/Workout/AddWorkoutModal";
import { PlanWorkoutModal } from "../components/Workout/PlanWorkoutModal";
const EXERCISE_API_KEY = import.meta.env.VITE_EXERCISE_API_KEY;
import { MdDelete } from "react-icons/md";

export const Workout = () => {
  const user = localStorage.getItem("user");
  const parseUser = JSON.parse(user);
  const [query, setQuery] = useState("");
  const [searchData, setSearchData] = useState({ exercises: [] });
  const [hasSearched, setHasSearched] = useState(false);
  const [addWorkoutModal, setAddWorkoutModal] = useState(false);
  const [planWorkoutModal, setPlanWorkoutModal] = useState(false);

  const handleSearch = async (e) => {
    const toastId = toast.loading("Loading...");
    e.preventDefault();

    if (query.length > 2) {
      try {
        const response = await apiConnector(
          "GET",
          `https://api.api-ninjas.com/v1/exercises?muscle=${query}`,
          null,
          {
            "X-Api-Key": EXERCISE_API_KEY,
            "Content-Type": "application/json",
          }
        );

        setSearchData({
          exercises: response.data.map((exercise) => ({
            name: exercise.name,
            type: exercise.type,
            instruction: exercise.instructions,
            equipments: exercise.equipment,
          })),
        });
        toast.dismiss(toastId);
        setHasSearched(true);
      } catch (error) {
        console.error("Error fetching the food data", error);
        toast.dismiss(toastId);
        setHasSearched(true);
      }
    } else {
      toast.dismiss(toastId);
      setHasSearched(true);
    }
    setQuery("");
  };
  const [data, setData] = useState([]);
  const [exercisePlanData, setExercisePlanData] = useState([]);

  const fetchExerciseData = async () => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector(
        "GET",
        `http://localhost:8080/api/exercises/user/${parseUser.id}`
      );
      setData(response.data);
      toast.dismiss(toastId);
    } catch (error) {
      toast.error(error.message);
      toast.dismiss(toastId);
    }
  };

  const fetchExercisePlanData = async () => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector(
        "GET",
        `http://localhost:8080/api/exercisePlan/get/${parseUser.id}`
      );
      setExercisePlanData(response.data);
      toast.dismiss(toastId);
    } catch (error) {
      toast.error(error.message);
      toast.dismiss(toastId);
    }
  };
  useEffect(() => {
    fetchExerciseData();
    fetchExercisePlanData();
  }, []);

  const handleDeleteExercise = async (id) => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector(
        "DELETE",
        `http://localhost:8080/api/exercises/delete/${id}`
      );
      setData(data.filter((d) => d.id !== id));
      toast.success("Exercise Deleted!")
      toast.dismiss(toastId);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      toast.dismiss(toastId);
    }
  };
  const handleDeleteExercisePlan=async(id)=>{
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector(
        "DELETE",
        `http://localhost:8080/api/exercisePlan/delete/${id}`

      );
      setExercisePlanData(exercisePlanData.filter((d) => d.id !== id));
      toast.success("Exercise Plan Deleted!")
      toast.dismiss(toastId);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      toast.dismiss(toastId);
    }
  }
  const totalCaloriesBurned = () => {
    return data.reduce((total, item) => total + item.caloriesBurned, 0);
  };
  const totalDuration = () => {
    return data.reduce((total, item) => total + item.duration, 0);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center mt-20">
      <div className="w-full max-w-4xl p-6">
        <h1 className="text-2xl font-bold text-center mb-4">
          Workout Dashboard
        </h1>
        <p className="text-center mb-8">
          Track your workouts and monitor your progress.
        </p>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white shadow-md p-4 rounded">
            <h2 className="text-xl font-bold">Workouts</h2>
            <p className="text-2xl">{data.length}</p>
          </div>
          <div className="bg-white shadow-md p-4 rounded">
            <h2 className="text-xl font-bold">Calories Burned</h2>
            <p className="text-2xl">{totalCaloriesBurned()}</p>
          </div>
          <div className="bg-white shadow-md p-4 rounded">
            <h2 className="text-xl font-bold">Workout Time</h2>
            <p className="text-2xl">{totalDuration()}</p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Workouts</h2>
          {data.map((workout) => (
            <div
              key={workout.id}
              className="bg-white shadow-md p-4 rounded mb-4 flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-bold">{workout.name}</h3>
                <p>Duration: {workout.duration}</p>
                <p>{workout.caloriesBurned} kcal</p>
              </div>
              <button onClick={() => handleDeleteExercise(workout.id)}>
                <MdDelete className="text-3xl hover:text-gray-700 cursor-pointer" />
              </button>
            </div>
          ))}
          <button
            className="bg-green-500 text-white py-2 px-4 rounded"
            onClick={() => setAddWorkoutModal(true)}
          >
            Add Workout
          </button>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Your Workout Plans</h2>
          {exercisePlanData.map((plan) => (
            <div key={plan.id} className="bg-white shadow-md p-4 rounded mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold">{plan.dayOfWeek}</h3>
                <p>{plan.exerciseName}</p>
                <p>{plan.exerciseType}</p>
                <p>{plan.duration}</p>
              </div>
              <button onClick={() => handleDeleteExercisePlan(plan.id)}>
                <MdDelete className="text-3xl hover:text-gray-700 cursor-pointer" />
              </button>
            </div>
          ))}
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded"
            onClick={() => setPlanWorkoutModal(true)}
          >
            Create Plan
          </button>
        </div>

        <div className="mb-8">
          <form
            onSubmit={handleSearch}
            className="flex gap-4 items-start justify-center"
          >
            <input
              type="text"
              placeholder="Search for exercise by muscle"
              className="w-full p-2 mb-4 border rounded"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              required
            />
            <button
              type="submit"
              className="p-2 bg-blue-500 text-white rounded"
            >
              <IoSearchOutline className="text-2xl font-bold" />
            </button>
          </form>

          {searchData.exercises.slice(0, 5).map((exercise, index) => (
            <div
              key={index}
              className="bg-white shadow-md p-4 rounded mb-4 gap-5"
            >
              <div className="flex flex-col gap-1">
                <h3 className="text-lg font-bold">{exercise.name}</h3>
                <p>
                  <span className="font-semibold">Type</span>:{exercise.type}
                </p>
                <p>
                  <span className="font-semibold">Instructions</span>:
                  {exercise.instruction}
                </p>
                <p>
                  <span className="font-semibold">Equipment</span>:{" "}
                  {exercise.equipments}
                </p>
              </div>
            </div>
          ))}

          {hasSearched && searchData.exercises.length === 0 && (
            <div className="text-center font-bold text-lg">
              No Result Found!
            </div>
          )}
        </div>
      </div>

      {addWorkoutModal && (
        <AddWorkoutModal setAddWorkoutModal={setAddWorkoutModal} />
      )}

      {planWorkoutModal && (
        <PlanWorkoutModal setPlanWorkoutModal={setPlanWorkoutModal} />
      )}
    </div>
  );
};
