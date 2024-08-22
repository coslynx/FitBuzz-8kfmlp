"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { usePostStore } from "@/store/postStore";
import { useUserStore } from "@/store/userStore";
import Post from "@/components/Post";
import Spinner from "@/components/Spinner";
import { formatDate } from "@/utils/dateUtils";

interface SocialFeedProps {
  posts: {
    id: number;
    userId: number;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    user: {
      id: number;
      firstName: string;
      lastName: string;
    };
    likes: {
      id: number;
      firstName: string;
      lastName: string;
    }[];
  }[];
}

const SocialFeed: React.FC<SocialFeedProps> = ({ posts }) => {
  const { data: session } = useSession();
  const { getUser } = useUserStore();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default SocialFeed;