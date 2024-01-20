import { IoIosLink } from "react-icons/io";
import { ImUpload2 } from "react-icons/im";

import UrlContainer from "./UrlContainer";

import "./GetVideo.css";
import { useState } from "react";

const GetVideo = () => {
  const [option, setOption] = useState<string | null>(null);

  const handleOptionClick = (choicedOption:string) => {
    setOption(choicedOption);
  }

  return (
    <>
      <div className="upload-video-container">
        <h2 className="choose-text">Choose a config</h2>
        <hr className="separator" />
        <ul className="load-options">
          <li className="options-url-upload" onClick={() => handleOptionClick('url')}>
            <IoIosLink />
            <p className="option-text">URL</p>
          </li>
          <li className="options-url-upload" onClick={() => handleOptionClick('upload')}>
            <ImUpload2 />
            <p className="option-text">Upload Video</p>
          </li>
        </ul>
        <div className="chosen-option-container">
          {option === 'url' && <UrlContainer />}
          {option === 'upload' && <UrlContainer />}
        </div>
      </div>
    </>
  );
};

export default GetVideo;
