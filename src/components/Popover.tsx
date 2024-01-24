import React, { MouseEvent } from "react";

import "./Popover.css";

type ButtonOptionsSize = {
  onClick: (size: string, modelName: string, modelType: string) => void;
  modelName: string;
  modelType: string;
};

const Popover = ({ onClick, modelName, modelType }: ButtonOptionsSize) => {
  return (
    <div className="popover">
      <button
        className="size-option"
        onClick={() => onClick("small", modelName, modelType)}
      >
        small
      </button>
      <button
        className="size-option"
        onClick={() => onClick("medium", modelName, modelType)}
      >
        medium
      </button>
      <button
        className="size-option"
        onClick={() => onClick("large", modelName, modelType)}
      >
        large
      </button>
    </div>
  );
};

export default Popover;
