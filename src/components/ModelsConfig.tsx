import React, { useState } from "react";

import ButtonOptions from "./ButtonOptions";
import HorizontalLine from "./HorizontalLine";
import Popover from "./Popover";
import Input from "./Input";

import "./ModelsConfig.css";

type AiModel = {
  modelAi: string;
  modelAiSize?: string;
};

type TranscriptionModel = {
  modelTranscription: string;
  modelTranscriptionSize?: string;
};

const ConfigAiModels = () => {
  const [selectedAiModels, setSelectedAiModels] = useState<AiModel | {}>({});
  const [selectedTranscriptionModels, setSelectedTranscriptionModels] =
    useState<TranscriptionModel | {}>({});
  const [popoverVisible, setPopoverVisible] = useState<string | false>(false);

  const modelsRequiringSize: string[] = ["gpt-3", "whisper"];

  const handleAiModelToggle = (newSelected: string) => {
    setSelectedAiModels((prevSelectedModels) => {
      if ("modelAi" in prevSelectedModels) {
        prevSelectedModels.modelAi === newSelected
          ? (setPopoverVisible(false), (prevSelectedModels = {}))
          : (setPopoverVisible(false),
            modelsRequiringSize.includes(newSelected) &&
              setPopoverVisible(newSelected),
            (prevSelectedModels = { modelAi: newSelected }));
        return prevSelectedModels;
      } else {
        modelsRequiringSize.includes(newSelected) &&
          setPopoverVisible(newSelected);
        return { modelAi: newSelected };
      }
    });
  };

  const handleTranscriptionModelToggle = (newSelected: string) => {
    setSelectedTranscriptionModels((prevSelectedModels) => {
      if ("modelTranscription" in prevSelectedModels) {
        prevSelectedModels.modelTranscription === newSelected
          ? (setPopoverVisible(false), (prevSelectedModels = {}))
          : (setPopoverVisible(false),
            modelsRequiringSize.includes(newSelected) &&
              setPopoverVisible(newSelected),
            (prevSelectedModels = { modelTranscription: newSelected }));
        return prevSelectedModels;
      } else {
        modelsRequiringSize.includes(newSelected) &&
          setPopoverVisible(newSelected);
        return { modelTranscription: newSelected };
      }
    });
  };

  const handleSizeClick = (
    size: string,
    modelName: string,
    modelType: string
  ) => {
    if (modelType === "ai") {
      if ("modelAi" in selectedAiModels) {
        selectedAiModels.modelAi === modelName
          ? ((selectedAiModels.modelAiSize = size), setPopoverVisible(false))
          : null;
      }
    } else {
      if ("modelTranscription" in selectedTranscriptionModels) {
        selectedTranscriptionModels.modelTranscription === modelName
          ? ((selectedTranscriptionModels.modelTranscriptionSize = size),
            setPopoverVisible(false))
          : null;
      }
    }
  };
  return (
    <>
      <div className="transcription-ia-container">
        <HorizontalLine />
        <h4>Type Transcription</h4>
        <div className="transcription-options">
          <ButtonOptions
            onClick={() => handleTranscriptionModelToggle("whisper")}
            isSelected={
              "modelTranscription" in selectedTranscriptionModels
                ? selectedTranscriptionModels.modelTranscription.includes(
                    "whisper"
                  )
                : false
            }
          >
            Whisper
          </ButtonOptions>
          {popoverVisible === "whisper" && (
            <Popover
              onClick={handleSizeClick}
              modelName="whisper"
              modelType="transcription"
            ></Popover>
          )}
        </div>
        <HorizontalLine />
        <h4>AI Model</h4>
        <div className="ai-options">
          <ButtonOptions
            onClick={() => handleAiModelToggle("gpt-3")}
            isSelected={
              "modelAi" in selectedAiModels
                ? selectedAiModels.modelAi.includes("gpt-3")
                : false
            }
          >
            GPT-3
          </ButtonOptions>
          {popoverVisible === "gpt-3" && (
            <Popover
              onClick={handleSizeClick}
              modelName="gpt-3"
              modelType="ai"
            ></Popover>
          )}
          <ButtonOptions
            onClick={() => handleAiModelToggle("bard")}
            isSelected={
              "modelAi" in selectedAiModels
                ? selectedAiModels.modelAi.includes("bard")
                : false
            }
          >
            Bard
          </ButtonOptions>
        </div>
      </div>
      <HorizontalLine />
      <h3>AI KEY</h3>
      <Input option="key" />
      <HorizontalLine />
    </>
  );
};

export default ConfigAiModels;
