import React, { useState } from "react";

import ButtonOptions from "./ButtonOptions";
import HorizontalLine from "./HorizontalLine";
import Popover from "./Popover";
import Input from "./Input";
import LoadConfigButton from "./LoadConfigButton";
// import { Toaster, toast } from "sonner";

import "./ModelsConfig.css";
// import { toast, Toaster } from "sonner";

type AiModel = {
  modelAi: string;
  modelAiSize?: string;
};

type TranscriptionModel = {
  modelTranscription: string;
  modelTranscriptionSize?: string;
};

const ConfigAiModels = ({ option }: { option: string }) => {
  const [selectedAiModels, setSelectedAiModels] = useState<AiModel | {}>({});

  const [selectedTranscriptionModels, setSelectedTranscriptionModels] =
    useState<TranscriptionModel | {}>({});

  const [textProcessingOption, setTextProcessingOption] = useState<string>("");

  const [popoverVisible, setPopoverVisible] = useState<string | false>(false);

  const [inputValueVideo, setInputValueVideo] = useState<string>("");
  const [inputValueKey, setInputValueKey] = useState<string>("");

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

  const handleProcessingTextToggle = (newSelected: string) => {
    setTextProcessingOption((prevSelected) => {
      textProcessingOption === newSelected
        ? (prevSelected = "")
        : (prevSelected = newSelected);
      return prevSelected;
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

  const handleInputOnChange = (
    option: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (option === "key") {
      setInputValueKey(e.target.value);
    } else {
      setInputValueVideo(e.target.value);
    }
  };

  const testEmptyValueState = (state: string) => !state;

  const testEmptyValueObject = (obj: {} | AiModel | TranscriptionModel) => {
    return (
      Object.entries(obj).length === 0 ||
      Object.values(obj).some((value) => !value)
    );
  };

  const handleLoadConfigClick = () => {
    if (
      testEmptyValueState(inputValueVideo) ||
      testEmptyValueState(inputValueKey) ||
      testEmptyValueState(textProcessingOption) ||
      testEmptyValueObject(selectedAiModels) ||
      testEmptyValueObject(selectedTranscriptionModels)
    ) {
      console.log("erro");
    } else {
      const config = {
        inputValueVideo,
        selectedAiModels,
        selectedTranscriptionModels,
        textProcessingOption,
        inputValueKey,
      };
      // toast("My first toast");
      console.log(config);
    }
  };

  return (
    <>
      <Input
        option={option}
        onChange={(e) => {
          handleInputOnChange(option, e);
        }}
        inputValue={inputValueVideo}
      />
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
            {`Whisper ${
              "modelTranscriptionSize" in selectedTranscriptionModels
                ? selectedTranscriptionModels.modelTranscriptionSize
                : ""
            }`}
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
        <HorizontalLine />
        <h4>Text processing option</h4>
        <div className="ai-options">
          <ButtonOptions
            onClick={() => handleProcessingTextToggle("summarizing")}
            isSelected={textProcessingOption === "summarizing" ? true : false}
          >
            Summarizing
          </ButtonOptions>
          <ButtonOptions
            onClick={() => handleProcessingTextToggle("classifying")}
            isSelected={textProcessingOption === "classifying" ? true : false}
          >
            Classifying
          </ButtonOptions>
        </div>
      </div>
      <HorizontalLine />
      <h3>AI KEY</h3>
      <Input
        option="key"
        onChange={(e) => {
          handleInputOnChange("key", e);
        }}
        inputValue={inputValueKey}
      />

      <HorizontalLine />
      <LoadConfigButton
        onClick={handleLoadConfigClick}
      >{`Load ${textProcessingOption}`}</LoadConfigButton>
      {/* <Toaster /> */}
    </>
  );
};

export default ConfigAiModels;
