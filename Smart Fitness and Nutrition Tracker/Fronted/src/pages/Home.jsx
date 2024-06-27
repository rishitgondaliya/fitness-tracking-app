import React from "react";
import SimpleCarousel from "../components/Home/Carousel";
import workout_tracking from "../assets/featues/workout-tracking.webp";
import nutrition_tracking from "../assets/featues/nutrition-tracking.webp";
import health_insight from "../assets/featues/health-insight.webp";
import integration_wearable from "../assets/featues/integration-wearable.webp";
import personalized_recommendation from "../assets/featues/personalized-recommendation.webp";
import fitness_nutrition_news from "../assets/featues/fitness-nutrition-newss.webp";

import { ReviewSlider } from "../components/Home/ReviewSlider";

export const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <SimpleCarousel />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 mt-10">
        <div className="card hover:scale-105 hover:shadow-md bg-white p-4 rounded shadow text-center">
          <img
            src={workout_tracking}
            alt="Workout Tracking"
            className="mx-auto mb-4 w-[100px] h-[100px] object-cover rounded-md"
          />
          <h3 className="text-xl font-bold mb-2">Workout Tracking</h3>
          <p>Track your workouts.</p>
        </div>
        <div className="card hover:scale-105 hover:shadow-md bg-white p-4 rounded shadow text-center">
          <img
            src={nutrition_tracking}
            alt="Nutrition Tracking"
            className="mx-auto mb-4 w-[100px] h-[100px] object-cover rounded-md"
          />
          <h3 className="text-xl font-bold mb-2">Nutrition Tracking</h3>
          <p>Monitor your meals.</p>
        </div>
        <div className="card hover:scale-105 hover:shadow-md bg-white p-4 rounded shadow text-center">
          <img
            src={health_insight}
            alt="Health Insights"
            className="mx-auto mb-4 w-[100px] h-[100px] object-cover rounded-md"
          />
          <h3 className="text-xl font-bold mb-2">Health Insights</h3>
          <p>Get daily summaries.</p>
        </div>
        <div className="card hover:scale-105 hover:shadow-md bg-white p-4 rounded shadow text-center">
          <img
            src={personalized_recommendation}
            alt="Personalized Recommendations"
            className="mx-auto mb-4 w-[100px] h-[100px] object-cover rounded-md"
          />
          <h3 className="text-xl font-bold mb-2">
            Personalized Recommendations
          </h3>
          <p>Get tailored advice.</p>
        </div>
        <div className="card hover:scale-105 hover:shadow-md bg-white p-4 rounded shadow text-center">
          <img
            src={integration_wearable}
            alt="Integration with Wearables"
            className="mx-auto mb-4 w-[100px] h-[100px] object-cover rounded-md"
          />
          <h3 className="text-xl font-bold mb-2">Integration with Wearables</h3>
          <p>Sync your devices.</p>
        </div>
        <div className="card hover:scale-105 hover:shadow-md bg-white p-4 rounded shadow text-center">
          <img
            src={fitness_nutrition_news}
            alt="Health and Fitness News"
            className="mx-auto mb-4 w-[100px] h-[100px] object-cover rounded-md"
          />
          <h3 className="text-xl font-bold mb-2">Health and Fitness News</h3>
          <p>Stay informed.</p>
        </div>
      </div>

      <section className="bg-gray-50 p-8 rounded shadow mb-8">
        <h2 className="text-2xl font-bold text-center mb-4">How It Works</h2>
        <ol className="list-decimal list-inside space-y-2 text-center">
          <li>Register and set up your profile.</li>
          <li>Log your workouts and meals.</li>
          <li>Get insights and personalized recommendations.</li>
          <li>Achieve your fitness goals.</li>
        </ol>
      </section>

      <section>
        <ReviewSlider />
      </section>
    </div>
  );
};
