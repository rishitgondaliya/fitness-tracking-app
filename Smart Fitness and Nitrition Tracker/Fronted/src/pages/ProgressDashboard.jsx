import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { apiConnector } from "../services/apiConnector";
import { useState } from "react";

function ProgressDashboard() {

  const [NoOfWorkOut, setNoOfWorkOut] = useState(null);
  const [NoOfMeal, setNoOfMeal] = useState(null);
  const [dietPlan, setDietPlan] = useState(null);


  const user=localStorage.getItem("user");
  const parseUser=JSON.parse(user);
  const userId=parseUser.id;

  const fetchDataByCategory = async (category) => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector(
        "GET",
        `http://localhost:8080/api/comulativecount/${category}/${userId}`
      );
      toast.dismiss(toastId);
      const data=response.data;
      return data;
    } catch (error) {
      console.log(error);
      toast.error(error);
      toast.dismiss(toastId)
      return null;
    }
  };

  useEffect(() => {
    fetchDataByCategory("Exercises")
      .then(data => setNoOfWorkOut(data))
      .catch(error => console.error('Error fetching Exercise data:', error));

    fetchDataByCategory("Meal")
      .then(data => setNoOfMeal(data))
      .catch(error => console.error('Error fetching Meal data:', error));

    fetchDataByCategory("DietPlan")
      .then(data => setDietPlan(data))
      .catch(error => console.error('Error fetching Meal data:', error)); 

  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8 mt-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">
            Progress Dashboard
          </h1>
          <p className="text-gray-600">
            Track your fitness and nutrition progress over time.
          </p>
        </div>

        {/* Progress Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-gray-800 text-lg font-bold">Workouts</h2>
            <p className="text-2xl font-semibold">{NoOfWorkOut}</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-gray-800 text-lg font-bold">Meals Logged</h2>
            <p className="text-2xl font-semibold">{NoOfMeal}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-gray-800 text-lg font-bold">Diet Plan</h2>
            <p className="text-2xl font-semibold">{dietPlan}</p>
          </div>
        </div>

        {/* Daily Summary */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            Daily Summary
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-gray-800 text-lg font-bold">Workouts</h3>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-gray-800 text-lg font-bold">Meals</h3>
   

            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-gray-800 text-lg font-bold">
                Overall Progress
              </h3>
              </div>
            </div>
          </div>
        </div>

        {/* Weekly/Monthly Reports */}
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Weekly/Monthly Reports
          </h2>
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700">
              Weekly
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700">
              Monthly
            </button>
          </div>
        </div>

        {/* Achievements and Milestones */}
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Achievements and Milestones
          </h2>
          <p className="text-gray-600">
            Here you can track your significant achievements and milestones.
          </p>
        </div>
      </div>
   );
}

export default ProgressDashboard;
