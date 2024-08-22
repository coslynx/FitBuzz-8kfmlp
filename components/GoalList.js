"use client";

import { useState, useEffect } from "react";
import { useGoalStore } from "@/store/goalStore";
import { useUserStore } from "@/store/userStore";
import GoalCard from "@/components/GoalCard";
import Spinner from "@/components/Spinner";

interface GoalListProps {
  userId: number;
}

const GoalList: React.FC<GoalListProps> = ({ userId }) => {
  const { goals, getGoals, isLoadingGoals } = useGoalStore();
  const { user, getUser } = useUserStore();

  useEffect(() => {
    if (user) {
      getGoals(user.id);
    }
  }, [user]);

  useEffect(() => {
    if (userId) {
      getUser(userId);
    }
  }, [userId]);

  if (isLoadingGoals) {
    return (
      <div className="flex justify-center items-center h-full">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {goals.map((goal) => (
        <GoalCard key={goal.id} goal={goal} />
      ))}
    </div>
  );
};

export default GoalList;