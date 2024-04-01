import { useEffect, useState } from "react";
import { AppConfig } from "../../types/config-type";
import { SubmitHandler, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import "./Forms.css";

const urlSchema = z.object({
  inputVideoPath: z.optional(z.any()),
  inputVideoUrl: z
    .string()
    .refine(
      (url) =>
        /^(http(s)??\:\/\/)?(www\.)?((youtube\.com\/watch\?v=)|(youtu.be\/))([a-zA-Z0-9\-_])+/.test(
          url
        ),
      {
        message: "Please enter a valid YouTube video URL",
      }
    ),
  modelTranscription: z.any().refine((file) => file !== null, {
    message: "Transcription model is required",
  }),
  modelAi: z.any().refine((file) => file !== null, {
    message: "Ai model is required",
  }),
  textProcessingOption: z.any().refine((file) => file !== null, {
    message: "Text processing option is required",
  }),
  aiKey: z
    .string()
    .refine((key) => key.length > 0, "API key is required for authentication"),
});

const fileSchema = z.object({
  inputVideoUrl: z.optional(z.any()),
  inputVideoPath: z
    .any()
    .refine((file) => file.length > 0, "Video path is required"),
  modelTranscription: z.any().refine((file) => file !== null, {
    message: "Transcription model is required",
  }),
  modelAi: z.any().refine((file) => file !== null, {
    message: "Ai model is required",
  }),
  textProcessingOption: z.any().refine((file) => file !== null, {
    message: "Text processing option is required",
  }),
  aiKey: z
    .string()
    .refine((key) => key.length > 0, "API key is required for authentication"),
});

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
  const schema = option === "url" ? urlSchema : fileSchema;
  type FormFields = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
    clearErrors,
  } = useForm<FormFields>({ resolver: zodResolver(schema) });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      console.log("Form submitted:", data);
      const newId = crypto.randomUUID();
      const newConfig = {
        id: newId,
        inputValueVideo:
          option === "url" ? data.inputVideoUrl : data.inputVideoPath[0].name,
        selectedAiModels: data.modelAi,
        selectedTranscriptionModels: data.modelTranscription,
        textProcessingOption: data.textProcessingOption,
        inputValueKey: data.aiKey,
      };
      updateAppConfigValue(newConfig);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      setError("inputVideoPath", {
        message: "This path video is invalid",
      });
    }
  };

  const [selectedFileName, setSelectedFileName] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList && fileList.length > 0) {
      const file = fileList[0];
      setSelectedFileName(file.name);
    } else {
      setSelectedFileName("");
    }
  };

  const handleClearOption = (register: "inputVideoUrl" | "inputVideoPath") => {
    clearErrors(register);
  };

  useEffect(() => {
    if (errors.inputVideoUrl) {
      toast.error(errors["inputVideoUrl"].message);
    } else if (errors.inputVideoPath) {
      toast.error(errors["inputVideoPath"].message);
    } else if (errors.modelTranscription) {
      toast.error(errors["modelTranscription"].message);
    } else if (errors.modelAi) {
      toast.error(errors["modelAi"].message);
    } else if (errors.textProcessingOption) {
      toast.error(errors["textProcessingOption"].message);
    } else if (errors.aiKey) {
      toast.error(errors["aiKey"].message);
    }
  }, [errors]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={`input-container ${option}`}>
        <input
          {...register("inputVideoUrl")}
          type="text"
          placeholder={`Enter ${option}`}
          className={option === "upload" ? "input disable" : "input"}
          onChange={(e) => {
            handleClearOption("inputVideoUrl");
            handleFileChange(e);
          }}
        />
        <input
          {...register("inputVideoPath")}
          className={option === "url" ? "input disable" : "input"}
          placeholder=""
          type="file"
          accept=".mp4, .avi, .mov, .mkv, .wmv, .flv"
          onChange={(e) => {
            handleClearOption("inputVideoPath");
            handleFileChange(e);
          }}
        />
        {option === "upload" && (
          <button className="btn-input-value">{`${
            selectedFileName || "Choose File"
          }`}</button>
        )}
      </div>
      <div className="transcription-ia-container">
        <hr className="horizontal-line" />
        <h4>Type Transcription</h4>
        <div className="transcription-options dropdown">
          <input
            {...register("modelTranscription")}
            className="option"
            type="radio"
            id="whisper"
            value="whisper"
          ></input>
          <label htmlFor="whisper">Whisper</label>
        </div>
        <hr className="horizontal-line" />
        <h4>AI Model</h4>
        <div className="ai-options dropdown">
          <input
            {...register("modelAi")}
            className="option"
            type="radio"
            id="gpt3"
            value="gpt3"
          ></input>
          <label htmlFor="gpt3">GPT-3</label>
          <input
            {...register("modelAi")}
            className="option"
            type="radio"
            id="gemini"
            value="gemini"
          ></input>
          <label htmlFor="gemini">Gemini</label>
        </div>
        <hr className="horizontal-line" />
        <h4>Text processing option</h4>
        <div className="text-processing-options">
          <input
            {...register("textProcessingOption")}
            className="option"
            type="radio"
            id="summarizing"
            value="summarizing"
          ></input>
          <label htmlFor="summarizing">Summarizing</label>
          <input
            {...register("textProcessingOption")}
            className="option"
            type="radio"
            id="classifying"
            value="classifying"
          ></input>
          <label htmlFor="classifying">Classifying</label>
        </div>
      </div>
      <hr className="horizontal-line" />
      <h3>AI KEY</h3>
      <div className={`input-container url`}>
        <input
          {...register("aiKey")}
          type="text"
          placeholder={`Enter ${option}`}
          className="input"
          onChange={(e) => {
            handleClearOption("inputVideoUrl");
            handleFileChange(e);
          }}
        />
      </div>
      <hr className="horizontal-line" />
      <button className="btn-submit" disabled={isSubmitting} type="submit">
        {isSubmitting ? "Loading" : "Submit"}
      </button>
      <Toaster position="bottom-right" />
    </form>
  );
};

export default FormContent;
