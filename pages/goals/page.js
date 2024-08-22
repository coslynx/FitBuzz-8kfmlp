"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useGoalStore } from "@/store/goalStore";
import GoalCard from "@/components/GoalCard";
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

export default function Goals() {
  const { data: session } = useSession();
  const { goals, getGoals, isLoadingGoals } = useGoalStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (session) {
      getGoals(session.user.id);
    }

    const fetchData = async () => {
      setIsLoading(true);
      if (session) {
        await getGoals(session.user.id);
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
        <h1 className="text-3xl font-bold mb-4">Goals</h1>

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
    </Layout>
  );
}