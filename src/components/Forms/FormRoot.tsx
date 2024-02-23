import { IoIosLink } from "react-icons/io";
import { ImUpload2 } from "react-icons/im";
import { useState } from "react";

import FormContent from "./FormContent";
import ButtonOptions from "./ButtonOptions";

import "./Forms.css";

const FormRoot = () => {
  const [option, setOption] = useState<string | null>(null);

  const handleOptionClick = (choicedOption: string) => {
    setOption(choicedOption);
  };

  return (
    <>
      <div className="forms-root-container">
        <div className="video-options">
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
        <div className="forms-content-container">
          {option !== null && <FormContent option={option} />}
        </div>
      </div>
    </>
  );
};

export default FormRoot;
