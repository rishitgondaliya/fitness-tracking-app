import React, { useState } from "react";
import toast from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import { apiConnector } from "../../services/apiConnector";

export const DietPlan= ({ setPlanMealModal}) => {
  const user = localStorage.getItem("user");
  const parseUser = JSON.parse(user);
  const [dietPlanName, setDietPlanName] = useState('');
  const [description, setDescription] = useState('');
  const [mealType, setMealType] = useState(''); 

  const handleSubmit =async (event) => {
    event.preventDefault();
    const userId = parseUser.id;

    const dietPlanData={dietPlanName, description, mealType, userId}

    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector(
        "POST",
        "http://localhost:8080/api/dietplans/add",
        dietPlanData
      );
      toast.success("Exercise Plan added");
      toast.dismiss(toastId);
      window.location.reload();
    } catch (error) {
      console.log(error);
      toast.error(`Add Exercise Plan failed: ${error.response.data}`);
      toast.dismiss(toastId);
    }
    setPlanMealModal(false);
  };

  return (
    <div className="fixed inset-0 z-[1000] grid h-screen w-screen place-items-center overflow-auto bg-gray-100 bg-opacity-20 backdrop-blur-sm">
      <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">
        {/* Modal Header */}
        <div className="flex items-center justify-between rounded-t-lg bg-gray-700 p-5 border-b-2 border-gray-400">
          <p className="text-xl font-semibold text-white">Create Diet Plan</p>

          <button onClick={() => setPlanMealModal(false)}>
            <RxCross2 className="text-2xl text-white" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 bg-gray-600 rounded-b-lg">
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col items-center">
            <div className="w-full flex flex-col gap-4">
              <div>
                <label className="block text-lg font-medium text-white">Diet Plan Name</label>
                <input
                  type="text"
                  value={dietPlanName}
                  placeholder="e.g. Keto Diet"
                  onChange={(e) => setDietPlanName(e.target.value)}
                  className="mt-1 block w-full  border-gray-300 shadow-sm  sm:text-sm rounded-[0.5rem] bg-gray-800 p-[12px]  border-b-[0.5px] text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-lg font-medium text-white">Description</label>
                <textarea
                  value={description}
                  placeholder="e.g. High-fat, low-carb diet for weight loss."
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-1 block w-full  border-gray-300 shadow-sm  sm:text-sm rounded-[0.5rem] bg-gray-800 p-[12px]  border-b-[0.5px] text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-lg font-medium text-white">Meal Type</label>
                <select
                  value={mealType}
                  onChange={(e) => setMealType(e.target.value)}
                  className="mt-1 block w-full  border-gray-300 shadow-sm  sm:text-sm rounded-[0.5rem] bg-gray-800 p-[12px]  border-b-[0.5px] text-white"
                  required
                >
                  <option value="">Select Meal Type</option>
                  <option value="Breakfast">Breakfast</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Dinner">Dinner</option>
                  <option value="Snack">Snack</option>
                </select>
              </div>
            </div>

            <div className="mt-6 flex w-11/12 justify-end gap-x-2">
              <button
                type="button"
                onClick={() => setPlanMealModal(false)}
                className="mt-6 rounded-[8px] bg-gray-200 py-[8px] px-[12px] font-bold text-black cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="mt-6 rounded-[8px] bg-yellow-500 py-[8px] px-[12px] font-bold text-black cursor-pointer"
              >
                Create Diet Plan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
