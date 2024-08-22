"use client";

import { useState, useEffect } from "react";
import { useGoalStore } from "@/store/goalStore";
import { useUserStore } from "@/store/userStore";
import { useProgressStore } from "@/store/progressStore";
import { formatDate } from "@/utils/dateUtils";
import ProgressChart from "@/components/ProgressChart";
import Spinner from "@/components/Spinner";
import { BsFillCheckCircleFill } from "react-icons/bs";

interface GoalCardProps {
  goal: {
    id: number;
    userId: number;
    type: string;
    target: number;
    deadline: Date;
    createdAt: Date;
    updatedAt: Date;
    user: {
      id: number;
      email: string;
      firstName: string;
      lastName: string;
      createdAt: Date;
      updatedAt: Date;
      goals: [];
      workouts: [];
      nutrition: [];
      sleep: [];
      posts: [];
      following: [];
      followers: [];
    };
    progress: [];
  };
}

const GoalCard: React.FC<GoalCardProps> = ({ goal }) => {
  const { user, getUser } = useUserStore();
  const { getProgress, progress, isLoadingProgress } = useProgressStore();
  const { deleteGoal } = useGoalStore();

  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    getUser(goal.userId);
  }, []);

  useEffect(() => {
    if (user) {
      getProgress(user.id);
    }
  }, [user]);

  const handleComplete = () => {
    setIsCompleted(true);
  };

  const handleDelete = () => {
    deleteGoal(goal.id);
  };

  const progressValue = progress.find((p) => p.goalId === goal.id)?.value;

  return (
    <div
      className={`bg-white rounded-lg shadow-md p-4 flex flex-col gap-3 cursor-pointer hover:scale-105 transition duration-300 ease-in-out ${
        isCompleted ? "opacity-50" : ""
      }`}
    >
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold">{goal.type}</h3>
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
        Target: {goal.target}, Deadline: {formatDate(goal.deadline)}
      </p>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <p className="text-gray-600 font-bold">Progress:</p>
          {isLoadingProgress ? (
            <Spinner />
          ) : progressValue !== undefined ? (
            <p className="text-gray-600 font-bold">{progressValue}%</p>
          ) : (
            <p className="text-gray-600 font-bold">Not Started</p>
          )}
        </div>
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
      {goal.progress && goal.progress.length > 0 && (
        <div className="mt-4">
          <ProgressChart goals={[goal]} />
        </div>
      )}
    </div>
  );
};

export default GoalCard;