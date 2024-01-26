import React, { useState } from "react";

import ButtonOptions from "./ButtonOptions";
import HorizontalLine from "./HorizontalLine";
import Popover from "./Popover";
import Input from "./Input";
import LoadConfigButton from "./LoadConfigButton";
import { Toaster, toast } from "sonner";

import "./ModelsConfig.css";

type AiModel = {
  modelName: string;
  modelSize?: string;
};

type TranscriptionModel = {
  modelName: string;
  modelSize?: string;
};

const ConfigAiModels = ({ option }: { option: string }) => {
  const [selectedAiModels, setSelectedAiModels] = useState<AiModel | {}>({});

  const [selectedTranscriptionModels, setSelectedTranscriptionModels] =
    useState<TranscriptionModel | {}>({});

  const [textProcessingOption, setTextProcessingOption] = useState<string>("");

  const [popoverVisible, setPopoverVisible] = useState<string | false>(false);

  const [inputValueVideoPath, setInputValueVideoPath] = useState<string>("");
  const [inputValueKey, setInputValueKey] = useState<string>("");

  const modelsRequiringSize: string[] = ["whisper"];

  const handleAiModelToggle = (newSelected: string) => {
    setSelectedAiModels((prevSelectedModels) => {
      if ("modelName" in prevSelectedModels) {
        prevSelectedModels.modelName === newSelected
          ? (setPopoverVisible(false), (prevSelectedModels = {}))
          : (setPopoverVisible(false),
            modelsRequiringSize.includes(newSelected) &&
              setPopoverVisible(newSelected),
            (prevSelectedModels = { modelName: newSelected }));
        return prevSelectedModels;
      } else {
        modelsRequiringSize.includes(newSelected) &&
          setPopoverVisible(newSelected);
        return { modelName: newSelected };
      }
    });
  };

  const handleTranscriptionModelToggle = (newSelected: string) => {
    setSelectedTranscriptionModels((prevSelectedModels) => {
      if ("modelName" in prevSelectedModels) {
        prevSelectedModels.modelName === newSelected
          ? (setPopoverVisible(false), (prevSelectedModels = {}))
          : (setPopoverVisible(false),
            modelsRequiringSize.includes(newSelected) &&
              setPopoverVisible(newSelected),
            (prevSelectedModels = { modelName: newSelected }));
        return prevSelectedModels;
      } else {
        modelsRequiringSize.includes(newSelected) &&
          setPopoverVisible(newSelected);
        return { modelName: newSelected };
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
      if ("modelName" in selectedAiModels) {
        selectedAiModels.modelName === modelName
          ? ((selectedAiModels.modelSize = size), setPopoverVisible(false))
          : null;
      }
    } else {
      if ("modelName" in selectedTranscriptionModels) {
        selectedTranscriptionModels.modelName === modelName
          ? ((selectedTranscriptionModels.modelSize = size),
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
      setInputValueVideoPath(e.target.value);
    }
  };

  const testObjectEmpty = (obj: {} | AiModel | TranscriptionModel) => {
    if ("modelName" in obj) {
      return modelsRequiringSize.includes(obj.modelName)
        ? !obj.modelSize
        : false;
    } else {
      return true;
    }
  };

  const handleLoadConfigClick = () => {
    if (!inputValueVideoPath) {
      toast.error("Video path is not provided");
    } else if (testObjectEmpty(selectedTranscriptionModels)) {
      if ("modelName" in selectedTranscriptionModels) {
        toast.error("Transcription model 'Size' is not provided");
      } else {
        toast.error("Transcription model is not provided");
      }
    } else if (testObjectEmpty(selectedAiModels)) {
      if ("modelName" in selectedAiModels) {
        toast.error("AI model 'Size' is not provided");
      } else {
        toast.error("AI model is not provided");
      }
    } else if (!textProcessingOption) {
      toast.error("Text processing option not specified");
    } else if (!inputValueKey) {
      toast.error("Missing API key for authentication");
    } else {
      const config = {
        inputValueVideoPath,
        selectedAiModels,
        selectedTranscriptionModels,
        textProcessingOption,
        inputValueKey,
      };
      toast.success("Success loading...");
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
        inputValue={inputValueVideoPath}
        setInputValueVideoPath={setInputValueVideoPath}
      />
      <div className="transcription-ia-container">
        <HorizontalLine />
        <h4>Type Transcription</h4>
        <div className="transcription-options">
          <ButtonOptions
            onClick={() => handleTranscriptionModelToggle("whisper")}
            isSelected={
              "modelName" in selectedTranscriptionModels
                ? selectedTranscriptionModels.modelName.includes("whisper")
                : false
            }
          >
            {`Whisper ${
              "modelSize" in selectedTranscriptionModels
                ? selectedTranscriptionModels.modelSize
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
              "modelName" in selectedAiModels
                ? selectedAiModels.modelName.includes("gpt-3")
                : false
            }
          >
            GPT-3
          </ButtonOptions>
          <ButtonOptions
            onClick={() => handleAiModelToggle("bard")}
            isSelected={
              "modelName" in selectedAiModels
                ? selectedAiModels.modelName.includes("bard")
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
        setInputValueVideoPath={setInputValueVideoPath}
      />

      <HorizontalLine />
      <LoadConfigButton
        onClick={handleLoadConfigClick}
      >{`Load ${textProcessingOption}`}</LoadConfigButton>
      <Toaster richColors />
    </>
  );
};

export default ConfigAiModels;
