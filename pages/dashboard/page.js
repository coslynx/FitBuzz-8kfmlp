"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useGoalStore } from "@/store/goalStore";
import { useWorkoutStore } from "@/store/workoutStore";
import { useNutritionStore } from "@/store/nutritionStore";
import { useSleepStore } from "@/store/sleepStore";
import { useUserStore } from "@/store/userStore";
import { usePostStore } from "@/store/postStore";
import { useRecommendationStore } from "@/store/recommendationStore";
import GoalCard from "@/components/GoalCard";
import WorkoutCard from "@/components/WorkoutCard";
import NutritionCard from "@/components/NutritionCard";
import SleepCard from "@/components/SleepCard";
import RecommendationCard from "@/components/RecommendationCard";
import ProgressChart from "@/components/ProgressChart";
import SocialFeed from "@/components/SocialFeed";
import Spinner from "@/components/Spinner";
import Layout from "@/components/Layout";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};

export default function Dashboard() {
  const { data: session } = useSession();
  const { goals, getGoals, isLoadingGoals } = useGoalStore();
  const { workouts, getWorkouts, isLoadingWorkouts } = useWorkoutStore();
  const { nutrition, getNutrition, isLoadingNutrition } = useNutritionStore();
  const { sleep, getSleep, isLoadingSleep } = useSleepStore();
  const { user, getUser, isLoadingUser } = useUserStore();
  const { posts, getPosts, isLoadingPosts } = usePostStore();
  const { workoutRecommendations, getWorkoutRecommendations, isLoadingWorkoutRecommendations } =
    useRecommendationStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (session) {
      getGoals(session.user.id);
      getWorkouts(session.user.id);
      getNutrition(session.user.id);
      getSleep(session.user.id);
      getUser(session.user.id);
      getPosts(session.user.id);
      getWorkoutRecommendations(session.user.id);
    }

    const fetchData = async () => {
      setIsLoading(true);
      if (session) {
        await Promise.all([
          getGoals(session.user.id),
          getWorkouts(session.user.id),
          getNutrition(session.user.id),
          getSleep(session.user.id),
          getUser(session.user.id),
          getPosts(session.user.id),
          getWorkoutRecommendations(session.user.id),
        ]);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [session]);

  if (isLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-screen">
          <Spinner />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-bold mb-2">Goals</h2>
            {isLoadingGoals ? (
              <Spinner />
            ) : goals.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {goals.map((goal) => (
                  <GoalCard key={goal.id} goal={goal} />
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No goals yet.</p>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-bold mb-2">Workouts</h2>
            {isLoadingWorkouts ? (
              <Spinner />
            ) : workouts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {workouts.map((workout) => (
                  <WorkoutCard key={workout.id} workout={workout} />
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No workouts logged yet.</p>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-bold mb-2">Nutrition</h2>
            {isLoadingNutrition ? (
              <Spinner />
            ) : nutrition.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {nutrition.map((entry) => (
                  <NutritionCard key={entry.id} entry={entry} />
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No nutrition entries yet.</p>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-bold mb-2">Sleep</h2>
            {isLoadingSleep ? (
              <Spinner />
            ) : sleep.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {sleep.map((entry) => (
                  <SleepCard key={entry.id} entry={entry} />
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No sleep entries yet.</p>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-bold mb-2">Recommendations</h2>
            {isLoadingWorkoutRecommendations ? (
              <Spinner />
            ) : workoutRecommendations.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {workoutRecommendations.map((recommendation) => (
                  <RecommendationCard
                    key={recommendation.id}
                    recommendation={recommendation}
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No recommendations yet.</p>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-bold mb-2">Progress</h2>
            {isLoadingGoals ? (
              <Spinner />
            ) : goals.length > 0 ? (
              <ProgressChart goals={goals} />
            ) : (
              <p className="text-gray-500">No goals to track progress for.</p>
            )}
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold mb-2">Community</h2>
          {isLoadingPosts ? (
            <Spinner />
          ) : posts.length > 0 ? (
            <SocialFeed posts={posts} />
          ) : (
            <p className="text-gray-500">No posts yet.</p>
          )}
        </div>
      </div>
    </Layout>
  );
}