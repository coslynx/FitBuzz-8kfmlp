"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { usePostStore } from "@/store/postStore";
import Post from "@/components/Post";
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

export default function Community() {
  const { data: session } = useSession();
  const { posts, getPosts, isLoadingPosts } = usePostStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (session) {
      getPosts(session.user.id);
    }

    const fetchData = async () => {
      setIsLoading(true);
      if (session) {
        await getPosts(session.user.id);
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
        <h1 className="text-3xl font-bold mb-4">Community</h1>

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
    </Layout>
  );
}