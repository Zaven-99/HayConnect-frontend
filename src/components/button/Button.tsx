interface ButtonProps {
  label: string;
  className: string;
  type: "reset" | "button" | "submit";
  onClick?: () => void;
}

const Button = ({ label, className, type, onClick }: ButtonProps) => {
  return (
    <button type={type} className={className} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
