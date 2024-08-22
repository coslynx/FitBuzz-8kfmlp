"use client";

import React from "react";
import { motion } from "framer-motion";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "outline" | "danger";
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  type = "button",
  variant = "primary",
  className,
  children,
  onClick,
  isLoading = false,
  disabled = false,
}) => {
  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.1,
        ease: "easeInOut",
      },
    },
    active: {
      scale: 0.95,
      transition: {
        duration: 0.1,
        ease: "easeInOut",
      },
    },
  };

  const getButtonClasses = () => {
    const baseClasses =
      "px-4 py-2 rounded-md font-medium text-white transition duration-300 ease-in-out";

    switch (variant) {
      case "primary":
        return `${baseClasses} bg-primary-color hover:bg-primary-color-dark active:bg-primary-color-darker`;
      case "secondary":
        return `${baseClasses} bg-secondary-color hover:bg-secondary-color-dark active:bg-secondary-color-darker`;
      case "outline":
        return `${baseClasses} border border-primary-color text-primary-color hover:bg-primary-color hover:text-white active:bg-primary-color-dark active:text-white`;
      case "danger":
        return `${baseClasses} bg-error-color hover:bg-error-color-dark active:bg-error-color-darker`;
      default:
        return `${baseClasses} bg-primary-color hover:bg-primary-color-dark active:bg-primary-color-darker`;
    }
  };

  return (
    <motion.button
      type={type}
      className={`
        ${getButtonClasses()}
        ${className}
        ${isLoading || disabled ? "opacity-50 cursor-not-allowed" : ""}
      `}
      onClick={onClick}
      variants={buttonVariants}
      whileHover="hover"
      whileTap="active"
      disabled={isLoading || disabled}
    >
      {isLoading ? (
        <div className="animate-spin rounded-full h-5 w-5 border-t-4 border-white border-b-4 border-transparent"></div>
      ) : (
        children
      )}
    </motion.button>
  );
};

export default Button;