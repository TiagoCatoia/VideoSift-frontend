import { useState, useEffect, useContext } from "react";
import { AppConfig } from "../../types/config-type";

import Button from "../ui/Button";
import HorizontalLine from "../ui/HorizontalLine";
import PopoverSizes from "../ui/PopoverSizes";
import Input from "../ui/Input";
import toast from "react-hot-toast";

import "./Forms.css";

type AiModel = {
  modelName: string;
  modelSize?: string;
};

type TranscriptionModel = {
  modelName: string;
  modelSize?: string;
};

const FormContent = ({
  option,
  updateAppConfigValue,
}: {
  option: string;
  updateAppConfigValue: (newConfig: AppConfig) => void;
}) => {
  const [selectedAiModels, setSelectedAiModels] = useState<AiModel>({
    modelName: "",
  });
  const [selectedTranscriptionModels, setSelectedTranscriptionModels] =
    useState<TranscriptionModel>({
      modelName: "",
    });

  const [textProcessingOption, setTextProcessingOption] = useState<string>("");

  const [popoverVisible, setPopoverVisible] = useState<string | false>(false);

  const [inputValueVideoPath, setInputValueVideoPath] = useState<string>("");
  const [inputValueKey, setInputValueKey] = useState<string>("");

  const modelsRequiringSize: string[] = ["whisper"];

  useEffect(() => {
    if (selectedAiModels.modelName) {
      const apiKey = localStorage.getItem(selectedAiModels.modelName);
      if (apiKey) {
        setInputValueKey(apiKey);
      }
    }
  }, [selectedAiModels.modelName]);

  const storageKey = (inputValueKey: string): void => {
    localStorage.setItem(selectedAiModels.modelName, inputValueKey);
  };

  const handleModelToggle = (
    newSelected: string,
    setSelectedModels: React.Dispatch<
      React.SetStateAction<AiModel | TranscriptionModel>
    >,
    modelsRequiringSize: string[]
  ) => {
    setSelectedModels((prevSelectedModels) => {
      if (prevSelectedModels.modelName) {
        prevSelectedModels.modelName === newSelected
          ? (setPopoverVisible(false), (prevSelectedModels = { modelName: "" }))
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
    const selectedModels =
      modelType === "ai" ? selectedAiModels : selectedTranscriptionModels;

    if (selectedModels.modelName) {
      selectedModels.modelName === modelName
        ? ((selectedModels.modelSize = size), setPopoverVisible(false))
        : null;
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

  const testObjectEmpty = (obj: AiModel | TranscriptionModel) => {
    if (obj.modelName) {
      return modelsRequiringSize.includes(obj.modelName)
        ? !obj.modelSize
        : false;
    } else {
      return true;
    }
  };

  const handleSendConfig = () => {
    toast.remove();
    if (!inputValueVideoPath) {
      toast.error("Video path is not provided");
    } else if (testObjectEmpty(selectedTranscriptionModels)) {
      if (selectedTranscriptionModels.modelName) {
        toast.error("Transcription model 'Size' is not provided");
      } else {
        toast.error("Transcription model is not provided");
      }
    } else if (testObjectEmpty(selectedAiModels)) {
      if (selectedAiModels.modelName) {
        toast.error("AI model 'Size' is not provided");
      } else {
        toast.error("AI model is not provided");
      }
    } else if (!textProcessingOption) {
      toast.error("Text processing option is not provided");
    } else if (!inputValueKey) {
      toast.error("Missing API key for authentication");
    } else {
      const id = crypto.randomUUID();
      const newConfig = {
        id,
        inputValueVideoPath,
        selectedAiModels,
        selectedTranscriptionModels,
        textProcessingOption,
        inputValueKey,
      };
      storageKey(inputValueKey);
      updateAppConfigValue(newConfig);
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
          <Button
            onClick={() =>
              handleModelToggle(
                "whisper",
                setSelectedTranscriptionModels,
                modelsRequiringSize
              )
            }
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
          </Button>
          {popoverVisible === "whisper" && (
            <PopoverSizes
              onClick={handleSizeClick}
              modelName="whisper"
              modelType="transcription"
              sizes={[
                "tiny",
                "base",
                "small",
                "medium",
                "large-v1",
                "large-v2",
              ]}
            ></PopoverSizes>
          )}
        </div>
        <HorizontalLine />
        <h4>AI Model</h4>
        <div className="ai-options">
          <Button
            onClick={() =>
              handleModelToggle(
                "gpt-3",
                setSelectedAiModels,
                modelsRequiringSize
              )
            }
            isSelected={
              "modelName" in selectedAiModels
                ? selectedAiModels.modelName.includes("gpt-3")
                : false
            }
          >
            GPT-3
          </Button>
          <Button
            onClick={() =>
              handleModelToggle(
                "gemini",
                setSelectedAiModels,
                modelsRequiringSize
              )
            }
            isSelected={
              "modelName" in selectedAiModels
                ? selectedAiModels.modelName.includes("gemini")
                : false
            }
          >
            Gemini
          </Button>
        </div>
        <HorizontalLine />
        <h4>Text processing option</h4>
        <div className="text-processing-options">
          <Button
            onClick={() => handleProcessingTextToggle("summarizing")}
            isSelected={textProcessingOption === "summarizing" ? true : false}
          >
            Summarizing
          </Button>
          <Button
            onClick={() => handleProcessingTextToggle("classifying")}
            isSelected={textProcessingOption === "classifying" ? true : false}
          >
            Classifying
          </Button>
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
      <Button
        onClick={handleSendConfig}
        isSelected={true}
      >{`Load ${textProcessingOption}`}</Button>
    </>
  );
};

export default FormContent;
