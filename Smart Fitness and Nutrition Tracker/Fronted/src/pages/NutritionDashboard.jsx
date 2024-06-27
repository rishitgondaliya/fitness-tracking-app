import React, { useState, useEffect } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { apiConnector } from "../services/apiConnector";
import toast from "react-hot-toast";
import { AddMeal } from "../components/Nutrition/AddMeal";
import { DietPlan } from "../components/Nutrition/DietPlan";
const NUTRITION_API = import.meta.env.VITE_NUTRITION_API;
import { MdDelete } from "react-icons/md";

export const NutritionDashboard = () => {
  const user = localStorage.getItem("user");
  const parseUser = JSON.parse(user);

  const [query, setQuery] = useState("");
  const [searchData, setSearchData] = useState({ foods: [] });
  const [addMealModal, setAddMealModal] = useState(false);
  const [planMealModal, setPlanMealModal] = useState(false);

  const [mealdata, setMealData] = useState([]);
  const [planMealData, setPlanMealData] = useState([]);

  const fetchMealData = async () => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector(
        "GET",
        `http://localhost:8080/api/meals/get/${parseUser.id}`
      );
      // console.log(response.data);
      setMealData(response.data);
      toast.dismiss(toastId);
    } catch (error) {
      toast.error(error.message);
      toast.dismiss(toastId);
    }
  };

  const fetchPlanMeanlData = async () => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector(
        "GET",
        `http://localhost:8080/api/dietplans/get/${parseUser.id}`
      );
      // console.log(response.data);
      setPlanMealData(response.data);
      toast.dismiss(toastId);
    } catch (error) {
      toast.error(error.message);
      toast.dismiss(toastId);
    }
  };

  useEffect(() => {
    fetchMealData();
    fetchPlanMeanlData();
  }, []);

  const handleDeleteMeal = async (id) => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector(
        "DELETE",
        `http://localhost:8080/api/meals/delete/${id}`
      );
      setMealData(mealdata.filter((d) => d.id !== id));
      toast.success("Meal Deleted!");
      toast.dismiss(toastId);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      toast.dismiss(toastId);
    }
  };

  const handleDeleteMealPlan=async(id)=>{
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector(
        "DELETE",
        `http://localhost:8080/api/dietplans/delete/${id}`
      );
      setPlanMealData(planMealData.filter((d) => d.id !== id));
      toast.success("Meal Plan Deleted!");
      toast.dismiss(toastId);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      toast.dismiss(toastId);
    }
  }
  const totalCalories = () => {
    return mealdata.reduce((total, item) => total + item.calories, 0);
  };
  const totalProtien = () => {
    return mealdata.reduce((total, item) => total + item.protein, 0);
  };
  const totalCarbs = () => {
    return mealdata.reduce((total, item) => total + item.carbohydrates, 0);
  };

  const handleSearch = async (e) => {
    const toastId = toast.loading("Loading...");
    e.preventDefault(); // Prevent the default form submission behavior
    if (query.length > 3) {
      try {
        const response = await apiConnector("GET", `${NUTRITION_API}${query}`);

        setSearchData({
          foods: response.data.hints.map((hint) => ({
            image: hint.food.image,
            name: hint.food.label,
            description: hint.food.category,
            calories: hint.food.nutrients.ENERC_KCAL,
            protein: hint.food.nutrients.PROCNT,
          })),
        });
        toast.dismiss(toastId);
      } catch (error) {
        console.error("Error fetching the food data", error);
        toast.dismiss(toastId);
      }
    }
    setQuery("");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center mt-20">
      <div className="w-full max-w-4xl p-6">
        <h1 className="text-2xl font-bold text-center mb-4">
          Nutrition Dashboard
        </h1>
        <p className="text-center mb-8">
          Monitor your meals and nutritional intake.
        </p>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white shadow-md p-4 rounded">
            <h2 className="text-xl font-bold">Total Calories</h2>
            <p className="text-2xl">{totalCalories()} kcal</p>
          </div>
          <div className="bg-white shadow-md p-4 rounded">
            <h2 className="text-xl font-bold">Protein Intake</h2>
            <p className="text-2xl">{totalProtien()} g</p>
          </div>
          <div className="bg-white shadow-md p-4 rounded">
            <h2 className="text-xl font-bold">Carb Intake</h2>
            <p className="text-2xl">{totalCarbs()} g</p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Meals</h2>
          {mealdata.map((meal) => (
            <div
              key={meal.id}
              className="bg-white shadow-md p-4 rounded mb-4 flex items-center justify-between"
            >
              <div>
                <h3 className="text-lg font-bold">{meal.mealName}</h3>
                <p>Calories: {meal.calories} kcal</p>
                <p>Protein: {meal.protein} g</p>
                <p>Carbs: {meal.carbohydrates} g</p>
                <p>Fats: {meal.fat} g</p>
              </div>
              <button onClick={() => handleDeleteMeal(meal.id)}>
                <MdDelete className="text-3xl hover:text-gray-700 cursor-pointer" />
              </button>
            </div>
          ))}
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded"
            onClick={() => setAddMealModal(true)}
          >
            Add Meal
          </button>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Your Diet Plans</h2>
          {planMealData.map((plan) => (
            <div key={plan.id} className="bg-white shadow-md p-4 rounded mb-4 flex items-center justify-between">
              <div>
              <h3 className="text-lg font-bold">{plan.dietPlanName}</h3>
              <p>{plan.description}</p>
              <p>{plan.mealType}</p>
              </div>
              <button onClick={() => handleDeleteMealPlan(plan.id)}>
                <MdDelete className="text-3xl hover:text-gray-700 cursor-pointer" />
              </button>
            </div>
          ))}
          <button
            className="bg-green-500 text-white py-2 px-4 rounded"
            onClick={() => setPlanMealModal(true)}
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
              placeholder="Search for foods..."
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

          {searchData.foods.slice(0, 6).map((food, index) => (
            <div
              key={index}
              className="bg-white shadow-md p-4 rounded mb-4 flex gap-5"
            >
              <img
                src={food.image}
                alt={food.name}
                className="rounded-full h-28 w-28"
              />
              <div className="flex flex-col gap-1">
                <h3 className="text-lg font-bold">{food.name}</h3>
                <p>{food.description}</p>
                <p>Calories: {food.calories} kcal </p>
                <p>Protien: {food.protein} gm</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {addMealModal && <AddMeal setAddMealModal={setAddMealModal} setMealData={setMealData}/>}
      {planMealModal && <DietPlan setPlanMealModal={setPlanMealModal}/>}
    </div>
  );
};
