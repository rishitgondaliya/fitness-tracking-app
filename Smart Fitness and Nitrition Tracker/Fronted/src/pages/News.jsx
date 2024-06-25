
// https://developer.edamam.com/edamam-nutrition-api-demo  --> nutrition analysis

import { useEffect, useState } from "react";
import { NewsCard } from "../components/News/NewsCard";
import { apiConnector } from "../services/apiConnector";
import React from "react";
import toast from "react-hot-toast";
const NEWS_API=import.meta.env.VITE_FITNESS_NEWS_API

export const News = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
    const toastId=toast.loading("Loading...");
      try {
        const response = await apiConnector(
          "GET",
          NEWS_API,
        );
        const allArticles = response.data.articles;
        const shuffledArticles = allArticles.sort(() => 0.5 - Math.random());
        const randomArticles = shuffledArticles.slice(
          0,
          Math.floor(Math.random() * 6) + 10
        );
        setArticles(randomArticles);
        toast.dismiss(toastId);
      
      } catch (error) {
        console.error("Error fetching the news articles:", error);
        toast.dismiss(toastId);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="mt-20 bg-gray-100 flex flex-col">
      <div className=" text-center my-4">
        <h1 className="text-2xl font-bold">Health and Fitness News</h1>
        <p className="text-lg text-gray-600">
          Stay updated with the latest health and fitness news.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center mb-10 w-11/12 mx-auto">
        {articles.map((article, index) => (
          <NewsCard
          key={index}
            title={article.title}
            imageUrl={article.urlToImage}
            description={article.description}
            link={article.url}
          />
        ))}
      </div>

      <div className="bg-gray-200 p-8">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold">Trending Topics</h2>
        </div>
        <div className="flex justify-center gap-x-6">
          <span className="bg-white text-gray-700 rounded-full px-4 py-2 shadow-md hover:scale-105 cursor-pointer">
            Weight Loss
          </span>
          <span className="bg-white text-gray-700 rounded-full px-4 py-2 shadow-md  hover:scale-105 cursor-pointer">
            Weight Gain
          </span>
          <span className="bg-white text-gray-700 rounded-full px-4 py-2 shadow-md  hover:scale-105 cursor-pointer">
            Muscle Building
          </span>
          <span className="bg-white text-gray-700 rounded-full px-4 py-2 shadow-md  hover:scale-105 cursor-pointer">
            Fitness
          </span>
          <span className="bg-white text-gray-700 rounded-full px-4 py-2 shadow-md  hover:scale-105 cursor-pointer">
            Mental Wellbieng
          </span>
        </div>
      </div>
    </div>
  );
};
