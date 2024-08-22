"use client";

import { useState, useEffect } from "react";
import { useGoalStore } from "@/store/goalStore";
import { useUserStore } from "@/store/userStore";
import { useProgressStore } from "@/store/progressStore";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip
);

interface ProgressChartProps {
  goals: {
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
  }[];
}

const ProgressChart: React.FC<ProgressChartProps> = ({ goals }) => {
  const { user, getUser } = useUserStore();
  const { getProgress, progress, isLoadingProgress } = useProgressStore();

  useEffect(() => {
    if (user) {
      getProgress(user.id);
    }
  }, [user]);

  const chartData = {
    labels: [],
    datasets: [
      {
        label: "Progress",
        data: [],
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
      },
    ],
  };

  useEffect(() => {
    if (progress && progress.length > 0) {
      chartData.labels = progress.map((p) => new Date(p.createdAt).toLocaleDateString());
      chartData.datasets[0].data = progress.map((p) => p.value);
    }
  }, [progress]);

  return (
    <div className="h-96">
      {isLoadingProgress ? (
        <div className="flex justify-center items-center h-full">
          <span className="text-gray-500 font-bold">Loading...</span>
        </div>
      ) : (
        <Line data={chartData} />
      )}
    </div>
  );
};

export default ProgressChart;