"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStore";
import Image from "next/image";

export default function Header() {
  const { data: session } = useSession();
  const router = useRouter();
  const { user, getUser, resetUser } = useUserStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (session) {
      getUser(session.user.id);
    }
  }, [session]);

  useEffect(() => {
    if (user) {
      setIsLoading(false);
    }
  }, [user]);

  const handleLogout = async () => {
    const response = await fetch("/api/auth/signout");
    if (response.ok) {
      resetUser();
      router.push("/login");
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">
      <span className="text-gray-500 font-bold">Loading...</span>
    </div>;
  }

  return (
    <header className="bg-white shadow-md py-4 fixed top-0 w-full z-10">
      <div className="container mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8">
        <Link href="/">
          <Image
            src="/images/logo.svg"
            alt="Fitness Tracker Logo"
            width={150}
            height={40}
          />
        </Link>
        <nav>
          {session ? (
            <ul className="flex gap-4 items-center">
              <li>
                <Link href="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link href="/goals">Goals</Link>
              </li>
              <li>
                <Link href="/community">Community</Link>
              </li>
              <li>
                <Link href="/profile">Profile</Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="bg-primary-color text-white font-bold py-2 px-4 rounded-md hover:bg-primary-color-dark"
                >
                  Logout
                </button>
              </li>
            </ul>
          ) : (
            <ul className="flex gap-4 items-center">
              <li>
                <Link href="/login">Login</Link>
              </li>
              <li>
                <Link href="/register">Register</Link>
              </li>
            </ul>
          )}
        </nav>
      </div>
    </header>
  );
}