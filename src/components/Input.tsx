import React, { useEffect, useState } from "react";

import "./Input.css";

const Input = ({ option }: { option: string }) => {
  const [inputType, setInputType] = useState<string>("text");
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    setInputValue("");
    setInputType(option === "url" || option === "key" ? "text" : "file");
  }, [option]);

  return (
    <div className={`input-container ${option}`}>
      <input
        type={inputType}
        className="input"
        name="input"
        placeholder={`Enter ${option}`}
        value={`${inputValue}`}
        onChange={handleInputOnChange}
      />
      {option === "upload" && (
        <button className="btn-input-value">{`${
          inputValue ? inputValue : "Choose File"
        }`}</button>
      )}
    </div>
  );
};

export default Input;
