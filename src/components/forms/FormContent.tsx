import { useEffect, useState } from "react";
import { AppConfig } from "../../types/config-type";
import { Message, SubmitHandler, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import PopoverSizes from "../ui/PopoverSizes";
import { zipVideo } from "../../utils/zipVideo";
import { file } from "jszip";

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

const FormContent = ({
  option,
  updateAppConfigValue,
}: {
  option: string;
  updateAppConfigValue: (newConfig: AppConfig) => void;
}) => {
  const [whisperPop, setWhisperPop] = useState(false);

  const schema = option === "url" ? urlSchema : fileSchema;
  type FormFields = z.infer<typeof schema>;

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({ resolver: zodResolver(schema) });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      console.log("Form submitted:", data);
      const formData = new FormData();
      formData.append("file", data.inputVideoPath[0]);

      const newConfig = {
        inputValueVideo: option === "url" ? data.inputVideoUrl : formData,
        selectedAiModels: data.modelAi,
        selectedTranscriptionModels: data.modelTranscription,
        textProcessingOption: data.textProcessingOption,
        inputValueKey: data.aiKey,
      };
      updateAppConfigValue(newConfig);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.log(error);
    }
  };

  const [selectedFileName, setSelectedFileName] = useState<string>("");

  const handleUploadVideo = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target.files;
    if (fileInput) {
      const file = fileInput[0];
      setSelectedFileName(file.name);
      // const zipedVideo = await zipVideo(file);
      const formData = new FormData();
      formData.append("video", file);
      // setValue("inputVideoPath", zipedVideo);
    }
  };

  const handleOpenPopover = (e: any, ref: string) => {
    if (ref === "whisper") {
      e.preventDefault();
      setWhisperPop(!whisperPop);
    }
  };

  const handleSizeClick = (e: any, optionName: string, size: string) => {
    e.preventDefault();
    const input = document.querySelector(`#${optionName}`) as HTMLInputElement;
    const label = document.querySelector(`label[for=${optionName}]`);
    if (label) {
      label.textContent = optionName;
      setValue("modelTranscription", label.textContent + " " + size);
      label.textContent =
        label.textContent.charAt(0).toUpperCase() +
        label.textContent.slice(1) +
        ` ${size}`;
      input.checked = true;
    }
    if (optionName === "whisper") {
      setWhisperPop(false);
    }
  };

  document.addEventListener("click", (e: any) => {
    if (whisperPop) {
      const divPopover = document.querySelector(".popover-container");
      const button = document.querySelector("#whisper");
      if (divPopover && button) {
        if (!divPopover.contains(e.target) && !button.contains(e.target)) {
          const input = document.querySelector(`#whisper`) as HTMLInputElement;
          input.checked = false;
          setValue("modelTranscription", null);
          setWhisperPop(false);
        }
      }
    }
  });

  useEffect(() => {
    if (errors.inputVideoUrl) {
      toast.error(errors["inputVideoUrl"].message as Message);
    } else if (errors.inputVideoPath) {
      toast.error(errors["inputVideoPath"].message as Message);
    } else if (errors.modelTranscription) {
      toast.error(errors["modelTranscription"].message as Message);
    } else if (errors.modelAi) {
      toast.error(errors["modelAi"].message as Message);
    } else if (errors.textProcessingOption) {
      toast.error(errors["textProcessingOption"].message as Message);
    } else if (errors.aiKey) {
      toast.error(errors["aiKey"].message as Message);
    }
  }, [errors]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={`input-container ${option}`}>
          <input
            {...register("inputVideoUrl")}
            type="text"
            placeholder={`Enter ${option}`}
            className={option === "upload" ? "input disable" : "input"}
          />
          <input
            {...register("inputVideoPath")}
            className={option === "url" ? "input disable" : "input"}
            placeholder=""
            type="file"
            accept=".webm, .wav, .mpeg, .mp4, .mp3, .m4a"
            onChange={(e) => {
              handleUploadVideo(e);
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
              className={`${whisperPop ? "option" : "hidden"}`}
              type="radio"
              id="whisper"
              value="whisper"
              onClick={(e) => handleOpenPopover(e, "whisper")}
            ></input>
            <label htmlFor="whisper">Whisper</label>
            {whisperPop && (
              <PopoverSizes
                option="whisper"
                sizes={[
                  "tiny",
                  "base",
                  "small",
                  "medium",
                  "large-v1",
                  "large-v2",
                ]}
                onClick={handleSizeClick}
              />
            )}
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
          />
        </div>
        <hr className="horizontal-line" />
        <button className="btn-submit" disabled={isSubmitting} type="submit">
          {isSubmitting ? "Loading" : "Submit"}
        </button>
        <Toaster position="bottom-right" />
      </form>
      {whisperPop ? <div className="dark-fitler"></div> : ""}
    </>
  );
};

export default FormContent;
