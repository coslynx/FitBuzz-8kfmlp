"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { usePostStore } from "@/store/postStore";
import { useUserStore } from "@/store/userStore";
import { useLikeStore } from "@/store/likeStore";
import Button from "@/components/Button";
import Spinner from "@/components/Spinner";
import { formatDate } from "@/utils/dateUtils";

interface PostProps {
  post: {
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
  };
}

const Post: React.FC<PostProps> = ({ post }) => {
  const { data: session } = useSession();
  const { getUser } = useUserStore();
  const { likePost, unlikePost, isLiked } = useLikeStore();
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    setLiked(isLiked(post.id));
  }, [post.id, isLiked]);

  const handleLike = () => {
    if (session) {
      likePost(post.id);
      setLiked(true);
    }
  };

  const handleUnlike = () => {
    if (session) {
      unlikePost(post.id);
      setLiked(false);
    }
  };

  const handleClickUser = async () => {
    await getUser(post.userId);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2 cursor-pointer" onClick={handleClickUser}>
          <Image
            src={`https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/User_font_awesome.svg/2048px-User_font_awesome.svg.png`}
            alt="Profile Picture"
            width={40}
            height={40}
            className="rounded-full"
          />
          <div>
            <p className="text-lg font-bold">
              {post.user.firstName} {post.user.lastName}
            </p>
            <p className="text-gray-500 text-sm">
              {formatDate(post.createdAt)}
            </p>
          </div>
        </div>
        {/* ... */}
      </div>
      <p className="text-gray-700">{post.content}</p>
      <div className="flex justify-between items-center mt-2">
        <div className="flex items-center gap-2">
          <Button
            variant={liked ? "secondary" : "primary"}
            onClick={liked ? handleUnlike : handleLike}
          >
            {liked ? "Unlike" : "Like"}
          </Button>
          <p className="text-gray-600 font-bold">{post.likes.length} Likes</p>
        </div>
        {/* ... */}
      </div>
    </div>
  );
};

export default Post;