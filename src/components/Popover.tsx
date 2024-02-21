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
        onClick={() => onClick("tiny", modelName, modelType)}
      >
        tiny  
      </button>
      <button
        className="size-option"
        onClick={() => onClick("base  ", modelName, modelType)}
      >
        base
      </button>
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
        onClick={() => onClick("large-v1", modelName, modelType)}
      >
        large-v1
      </button> 
      <button
        className="size-option"
        onClick={() => onClick("large-v2", modelName, modelType)}
      >
        large-v2
      </button> 
    </div>
  );
};

export default Popover;
