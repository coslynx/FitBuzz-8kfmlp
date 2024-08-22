"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface InputFieldProps {
  id: string;
  type?: string;
  label?: string;
  placeholder?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  className?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  type = "text",
  label,
  placeholder,
  value,
  onChange,
  error,
  className,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (error) {
      inputRef.current?.classList.add("border-red-500");
    } else {
      inputRef.current?.classList.remove("border-red-500");
    }
  }, [error]);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className={`relative ${className}`}>
      {label && (
        <label htmlFor={id} className="block text-gray-700 text-sm font-bold mb-2">
          {label}
        </label>
      )}
      <input
        ref={inputRef}
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={`
          w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-primary-color focus:border-primary-color 
          ${isFocused ? "border-primary-color" : ""}
          ${error ? "border-red-500" : ""}
        `}
      />
      {error && (
        <p className="absolute bottom-4 left-0 text-red-500 text-xs font-bold">
          {error}
        </p>
      )}
    </div>
  );
};

export default InputField;