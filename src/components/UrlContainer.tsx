import React from "react";

import LoadVideoButton from "./LoadVideoButton";
import ConfigAiModels from "./ConfigAiModels";

import "./UrlContainer.css";

const UrlContainer = () => {
    return (
            <>
                <input type="text" className="url-input" name="url-input" placeholder="Enter URL"/>
                <div className="config-ai-model">
                    
                </div>
                <ConfigAiModels/>
                <LoadVideoButton />
            </>
    );
};

export default UrlContainer;