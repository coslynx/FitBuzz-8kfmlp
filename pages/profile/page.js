"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useUserStore } from "@/store/userStore";
import { usePostStore } from "@/store/postStore";
import { useGoalStore } from "@/store/goalStore";
import Layout from "@/components/Layout";
import Spinner from "@/components/Spinner";
import ProfileCard from "@/components/ProfileCard";
import Post from "@/components/Post";
import GoalCard from "@/components/GoalCard";
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

export default function Profile() {
  const { data: session } = useSession();
  const { user, getUser, isLoadingUser } = useUserStore();
  const { posts, getPosts, isLoadingPosts } = usePostStore();
  const { goals, getGoals, isLoadingGoals } = useGoalStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (session) {
      getUser(session.user.id);
      getPosts(session.user.id);
      getGoals(session.user.id);
    }
    const fetchData = async () => {
      setIsLoading(true);
      if (session) {
        await Promise.all([
          getUser(session.user.id),
          getPosts(session.user.id),
          getGoals(session.user.id),
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
        <h1 className="text-3xl font-bold mb-4">Profile</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow-md p-4">
            {isLoadingUser ? (
              <Spinner />
            ) : (
              <ProfileCard user={user} />
            )}
          </div>

          <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-bold mb-2">Posts</h2>
            {isLoadingPosts ? (
              <Spinner />
            ) : posts.length > 0 ? (
              <div>
                {posts.map((post) => (
                  <Post key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No posts yet.</p>
            )}
          </div>

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
        </div>
      </div>
    </Layout>
  );
}