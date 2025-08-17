import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outlined" | "ghost";
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = "primary",
  disabled = false,
  className = "",
  type = "button",
}) => {
  let baseStyles =
    "px-6 py-3 rounded-lg font-semibold text-base transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  let variantStyles = "";
  switch (variant) {
    case "primary":
      variantStyles =
        "bg-[#A3FFC8] text-gray-900 hover:bg-[#8FFFB4] focus:ring-[#A3FFC8]/50";
      break;
    case "secondary":
      variantStyles =
        "bg-black/50 text-[#A3FFC8] border border-[#A3FFC8]/30 hover:bg-gray-700 hover:border-[#A3FFC8] focus:ring-[#A3FFC8]/50";
      break;
    case "outlined":
      variantStyles =
        "bg-transparent text-[#A3FFC8] border-2 border-[#A3FFC8] hover:bg-[#A3FFC8]/10 focus:ring-[#A3FFC8]/50";
      break;
    case "ghost":
      variantStyles =
        "bg-transparent text-gray-300 hover:text-[#A3FFC8] hover:bg-black/50/50 focus:ring-[#A3FFC8]/50";
      break;
    default:
      variantStyles =
        "bg-[#A3FFC8] text-gray-900 hover:bg-[#8FFFB4] focus:ring-[#A3FFC8]/50";
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
