import type { ReactNode } from "react";

interface ButtonProps {
  label: string | ReactNode;
  className: string;
  type: "reset" | "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
}

const Button = ({ label, className, type, onClick, disabled }: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      type={type}
      className={className}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
