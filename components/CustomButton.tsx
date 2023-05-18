import { ClipLoader } from "react-spinners";
const CustomButton = ({
  children,
  className,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}) => {
  return (
    <button
      type="button"
      className={`px-8 py-3 font-semibold text-center text-white transition-all rounded-full bg-accent shadow-accent-volume hover:bg-accent-dark ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {disabled ? <ClipLoader size={16} color="#ffffff" /> : children}
    </button>
  );
};

export default CustomButton;
