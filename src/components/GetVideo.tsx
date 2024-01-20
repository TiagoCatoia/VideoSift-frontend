import { IoIosLink } from "react-icons/io";
import { ImUpload2 } from "react-icons/im";

import "./GetVideo.css";

const GetVideo = () => {
  return (
    <>
      <div className="upload-video-container">
        <h2 className="choose-text">Choose a format</h2>
        <hr className="separator" />
        <ul className="load-options">
          <li className="options-url-upload">
            <IoIosLink />
            <p className="option-text">URL</p>
          </li>
          <li className="options-url-upload">
            <ImUpload2 />
            <p className="option-text">Upload Video</p>
          </li>
        </ul>
      </div>
    </>
  );
};

export default GetVideo;
