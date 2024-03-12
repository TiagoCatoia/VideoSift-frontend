import "./PopoverSizes.css";

type ButtonOptionsSize = {
  onClick: (size: string, modelName: string, modelType: string) => void;
  modelName: string;
  modelType: string;
  sizes: string[];
};

const PopoverSizes = ({
  onClick,
  modelName,
  modelType,
  sizes,
}: ButtonOptionsSize) => {
  return (
    <div className="popover">
      {sizes.map((size) => (
        <button
          key={size}
          className="size-option"
          onClick={() => onClick(size, modelName, modelType)}
        >
          {size}
        </button>
      ))}
    </div>
  );
};

export default PopoverSizes;
