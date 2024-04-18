import "./PopoverSizes.css";

type ButtonOptionsSize = {
  onClick: (e: any, option: string, size: string) => void;
  option: string;
  sizes: string[];
};

const PopoverSizes = ({ onClick, option, sizes }: ButtonOptionsSize) => {
  
  return (
    <div className="popover-container">
      {sizes.map((size) => (
        <button
          key={size}
          className="size-option"
          onClick={(e) => onClick(e, option, size)}
        >
          {size}
        </button>
      ))}
    </div>
  );
};

export default PopoverSizes;
