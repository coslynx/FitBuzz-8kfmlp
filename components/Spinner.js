"use client";

import { useState, useEffect } from "react";

export default function Spinner() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex justify-center items-center">
      {isLoading && (
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-primary-color border-b-4 border-transparent"></div>
      )}
    </div>
  );
}