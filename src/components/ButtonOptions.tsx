import React, { ReactNode, MouseEvent } from "react";

import "./ButtonOptions.css";

type ButtonOptionsProps = {
  children: ReactNode;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  isSelected?: boolean;
};

const ButtonOptions = ({
  children,
  onClick,
  isSelected,
}: ButtonOptionsProps) => {
  return (
    <>
      <button
        className={`btn-options ${isSelected ? "selected" : ""}`}
        onClick={onClick}
      >
        {children}
      </button>
    </>
  );
};

export default ButtonOptions;
