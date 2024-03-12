import { ReactNode, MouseEvent } from "react";

import "./Button.css";

type ButtonProps = {
  children: ReactNode;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  isSelected?: boolean;
};

const Button = ({ children, onClick, isSelected }: ButtonProps) => {
  return (
    <>
      <button
        className={`btn ${isSelected ? "selected" : ""}`}
        onClick={onClick}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
