import React, { ChangeEvent, useEffect, useState } from "react";

import "./Input.css";

const Input = ({
  option,
  onChange,
  inputValue,
}: {
  option: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputValue: string;
}) => {
  const [inputType, setInputType] = useState<string>("text");

  useEffect(() => {
    // setInputValue("");
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
        onChange={onChange}
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
