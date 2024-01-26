import React, { MouseEventHandler } from "react";

import "./LoadConfigButton.css";

const LoadConfigButton = ({
  onClick,
  children,
}: {
  onClick: MouseEventHandler<HTMLButtonElement>;
  children: string;
}) => {
  return (
    <>
      <button className="btn-load-video" onClick={onClick}>
        {children}
      </button>
    </>
  );
};

export default LoadConfigButton;
