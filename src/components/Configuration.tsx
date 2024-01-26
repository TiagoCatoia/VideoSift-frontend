import { IoIosLink } from "react-icons/io";
import { ImUpload2 } from "react-icons/im";
import React, { useState } from "react";

import HorizontalLine from "./HorizontalLine";
import ModelsConfig from "./ModelsConfig";

import ButtonOptions from "./ButtonOptions";

import "./Configuration.css";

const Configuration = () => {
  const [option, setOption] = useState<string | null>(null);

  const handleOptionClick = (choicedOption: string) => {
    setOption(choicedOption);
  };

  return (
    <>
      <div className="configuration-container">
        <div className="load-options">
          <div onClick={() => handleOptionClick("url")}>
            <ButtonOptions>
              <IoIosLink />
              URL
            </ButtonOptions>
          </div>
          <div onClick={() => handleOptionClick("upload")}>
            <ButtonOptions>
              <ImUpload2 />
              Upload Video
            </ButtonOptions>
          </div>
        </div>
        <div className="configuration-options-container">
          {option !== null && <ModelsConfig option={option} />}
        </div>
      </div>
    </>
  );
};

export default Configuration;
