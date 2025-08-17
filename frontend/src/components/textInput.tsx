import React from "react";

interface TextInputProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  className?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  value,
  onChange,
  placeholder = "Search...",
  type = "text",
  className = "",
}) => {
  return (
    <div className="relative">
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 shadow-sm ${className}`}
        id={label.toLowerCase().replace(/\s/g, "-")}
      />
      <label
        htmlFor={label.toLowerCase().replace(/\s/g, "-")}
        className={`absolute left-4 top-3 text-gray-500 transition-all duration-300 origin-top-left pointer-events-none ${
          value
            ? "scale-75 -translate-y-3 text-blue-500"
            : "scale-100 translate-y-0"
        }`}
      >
        {label}
      </label>
    </div>
  );
};

export default TextInput;
