import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import toast from "react-hot-toast";
import { apiConnector } from "../../services/apiConnector";

export const AddMeal= ({ setAddMealModal,setMealData }) => {
  const [mealName, setMealName] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fat, setFat] = useState('');

  const handleSubmit = async (event) => {
    const user = localStorage.getItem("user");
    const parseUser = JSON.parse(user);

    event.preventDefault();

    const userId=parseUser.id;
    const mealData = {mealName,calories,protein,carbohydrates:carbs, fat,userId};
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector(
        "POST",
        "http://localhost:8080/api/meals/add",
        mealData
      );
      setMealData(prev =>[...prev, response]);
      toast.success("Meal added successfully!");
      toast.dismiss(toastId);
      window.location.reload();
    } catch (error) {
      console.log(error);
      toast.error(`Add Meal failed: ${error.response.data}`);
      toast.dismiss(toastId);
    }
    setAddMealModal(false);
  };

  return (
    <div className="fixed inset-0 z-[1000] grid h-screen w-screen place-items-center overflow-auto bg-gray-100 bg-opacity-20 backdrop-blur-sm">
      <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">
        {/* Modal Header */}
        <div className="flex items-center justify-between rounded-t-lg bg-gray-700 p-5 border-b-2 border-gray-400">
          <p className="text-xl font-semibold text-white">Add Meal</p>

          <button onClick={() => setAddMealModal(false)}>
            <RxCross2 className="text-2xl text-white" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 bg-gray-600 rounded-b-lg">
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col items-center">
            <div className="w-full flex flex-col gap-4">
              <div>
                <label className="block text-lg font-medium text-white">Meal Name</label>
                <input
                  type="text"
                  value={mealName}
                  placeholder="e.g. Chicken Salad"
                  onChange={(e) => setMealName(e.target.value)}
                  className="mt-1 block w-full  border-gray-300 shadow-sm  sm:text-sm rounded-[0.5rem] bg-gray-800 p-[12px]  border-b-[0.5px] text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-lg font-medium text-white">Calories (Kcal)</label>
                <input
                  type="number"
                  value={calories}
                  min={0}
                  placeholder="e.g. 300"
                  onChange={(e) => setCalories(e.target.value)}
                  className="mt-1 block w-full  border-gray-300 shadow-sm  sm:text-sm rounded-[0.5rem] bg-gray-800 p-[12px]  border-b-[0.5px] text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-lg font-medium text-white">Protein (g)</label>
                <input
                  type="number"
                  value={protein}
                  placeholder="e.g. 30"
                  min={0}
                  onChange={(e) => setProtein(e.target.value)}
                  className="mt-1 block w-full  border-gray-300 shadow-sm  sm:text-sm rounded-[0.5rem] bg-gray-800 p-[12px]  border-b-[0.5px] text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-lg font-medium text-white">Carbohydrates (g)</label>
                <input
                  type="number"
                  value={carbs}
                  placeholder="e.g. 40"
                  min={0}
                  onChange={(e) => setCarbs(e.target.value)}
                  className="mt-1 block w-full  border-gray-300 shadow-sm  sm:text-sm rounded-[0.5rem] bg-gray-800 p-[12px]  border-b-[0.5px] text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-lg font-medium text-white">Fat (g)</label>
                <input
                  type="number"
                  value={fat}
                  placeholder="e.g. 10"
                  min={0}
                  onChange={(e) => setFat(e.target.value)}
                  className="mt-1 block w-full  border-gray-300 shadow-sm  sm:text-sm rounded-[0.5rem] bg-gray-800 p-[12px]  border-b-[0.5px] text-white"
                  required
                />
              </div>
            </div>

            <div className="mt-6 flex w-11/12 justify-end gap-x-2">
              <button
                type="button"
                onClick={() => setAddMealModal(false)}
                className="mt-6 rounded-[8px] bg-gray-200 py-[8px] px-[12px] font-bold text-black cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="mt-6 rounded-[8px] bg-yellow-500 py-[8px] px-[12px] font-bold text-black cursor-pointer"
              >
                Add Meal
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
