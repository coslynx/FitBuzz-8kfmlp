"use client";

import { useState } from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { useNutritionStore } from "@/store/nutritionStore";

export default function NutritionCard({ entry }) {
  const { deleteNutritionEntry } = useNutritionStore();

  const [isCompleted, setIsCompleted] = useState(false);

  const handleComplete = () => {
    setIsCompleted(true);
  };

  const handleDelete = () => {
    deleteNutritionEntry(entry.id);
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-md p-4 flex flex-col gap-3 cursor-pointer hover:scale-105 transition duration-300 ease-in-out ${
        isCompleted ? "opacity-50" : ""
      }`}
    >
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold">Nutrition</h3>
        <button onClick={handleDelete} className="text-red-500 hover:text-red-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.894.553l.894.893.894-.893A1 1 0 0011 12z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      <p className="text-gray-500">
        Meal Type: {entry.mealType}, Calories: {entry.calories}, Macros:{" "}
        {entry.macros}
      </p>
      {!isCompleted && (
        <button
          onClick={handleComplete}
          className="bg-primary-color text-white font-bold py-2 px-4 rounded-md hover:bg-primary-color-dark"
        >
          Mark as Completed
        </button>
      )}
      {isCompleted && (
        <div className="flex justify-center items-center gap-2">
          <BsFillCheckCircleFill className="text-green-500 text-xl" />
          <p className="text-gray-600 font-bold">Completed</p>
        </div>
      )}
    </div>
  );
}