import { IoIosLink } from "react-icons/io";
import { ImUpload2 } from "react-icons/im";
import React, { useState } from "react";

import HorizontalLine from "./HorizontalLine";
import Input from "./Input";
import ModelsConfig from "./ModelsConfig";
import LoadConfigButton from "./LoadConfigButton";

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
        <h2 className="configuration-header">Choose a config</h2>
        <HorizontalLine />
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
        {option !== null && <Input option={option} />}
        <div className="configuration-options-container">
          {option !== null && (
            <>
              <ModelsConfig />
              <LoadConfigButton />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Configuration;
