"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useChatStore } from "@/store/chatStore";
import { useUserStore } from "@/store/userStore";
import ChatbotCard from "@/components/ChatbotCard";
import Spinner from "@/components/Spinner";
import { ChatbotProvider } from "@/context/ChatbotContext";

export default function Chatbot() {
  const { data: session } = useSession();
  const { messages, sendMessage, isLoadingMessages } = useChatStore();
  const { user, getUser, isLoadingUser } = useUserStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (session) {
      getUser(session.user.id);
    }

    const fetchData = async () => {
      setIsLoading(true);
      if (session) {
        await getUser(session.user.id);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [session]);

  if (isLoading || isLoadingUser) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <ChatbotProvider>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-4">Chatbot</h1>
        <ChatbotCard user={user} messages={messages} sendMessage={sendMessage} />
      </div>
    </ChatbotProvider>
  );
}