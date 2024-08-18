import { IoIosLink } from "react-icons/io";
import { ImUpload2 } from "react-icons/im";
import { useState } from "react";

import FormContent from "./FormContent";

import "./Forms.css";

const FormRoot = ({
  setFormData,
}: {
  setFormData: (formData: FormData) => void;
}) => {
  const [option, setOption] = useState<string | null>("url");

  const handleOptionClick = (choicedOption: string) => {
    setOption(choicedOption);
  };
  return (
    <>
      <div className="forms-root-container">
        <div className="video-options">
          <div onClick={() => handleOptionClick("url")}>
            <button className="btn-option-format-video">
              <IoIosLink />
              URL
            </button>
          </div>
          <div onClick={() => handleOptionClick("upload")}>
            <button className="btn-option-format-video">
              <ImUpload2 />
              Upload Video
            </button>
          </div>
        </div>
        <div className="forms-content-container">
          {option !== null && (
            <FormContent option={option} setFormData={setFormData} />
          )}
        </div>
      </div>
    </>
  );
};

export default FormRoot;
