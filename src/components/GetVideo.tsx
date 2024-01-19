import { useState } from "react";

import "./GetVideo.css";

const GetVideo = () => {
  const [videoPath, setVideoPath] = useState(null);

  return (
    <>
      <div className="transcription-input-container">
        <input
          className="input-video"
          placeholder="http://video"
          type="file"
        ></input>
        <button className="btn-load-video">Load Video</button>
      </div>
    </>
  );
};

export default GetVideo;
