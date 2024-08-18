import { useEffect, useState } from "react";
import { Message, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import "./Forms.css";

const urlSchema = z.object({
  file: z.optional(z.any()),
  video_url: z
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
  whisper_size: z.any().refine((file) => file !== "", {
    message: "Transcription model is required",
  }),
  llm_model: z.any().refine((file) => file !== "", {
    message: "AI model is required",
  }),
  text_processing_option: z.any().refine((file) => file !== "", {
    message: "Text processing option is required",
  }),
  api_token: z
    .string()
    .refine((key) => key.length > 0, "AI key is required for authentication"),
});

const fileSchema = z.object({
  video_url: z.optional(z.any()),
  file: z
    .any()
    .refine(
      (file) => file.length > 0,
      "Video file is required. Please select a file"
    ),
  whisper_size: z.any().refine((file) => file !== "", {
    message: "Transcription model is required",
  }),
  llm_model: z.any().refine((file) => file !== "", {
    message: "AI model is required",
  }),
  text_processing_option: z.any().refine((file) => file !== "", {
    message: "Text processing option is required",
  }),
  api_token: z
    .string()
    .refine((key) => key.length > 0, "AI key is required for authentication"),
});

const FormContent = ({
  option,
  setFormData,
}: {
  option: string;
  setFormData: (formData: FormData) => void;
}) => {
  const schema = option === "url" ? urlSchema : fileSchema;
  type FormFields = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({ resolver: zodResolver(schema) });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      console.log("Form submitted:", data);
      const formData = new FormData();
      if (option === "url") formData.append("video_url", data.video_url);
      if (option === "upload") formData.append("file", data.file[0]);
      formData.append("api_token", data.api_token);
      formData.append("whisper_size", data.whisper_size);
      formData.append("llm_model", data.llm_model);
      // text_processing_option: data.text_processing_option,
      setFormData(formData);
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
      const formData = new FormData();
      formData.append("video", file);
    }
  };

  useEffect(() => {
    if (errors.video_url) {
      toast.error(errors["video_url"].message as Message);
    } else if (errors.file) {
      toast.error(errors["file"].message as Message);
    } else if (errors.whisper_size) {
      toast.error(errors["whisper_size"].message as Message);
    } else if (errors.llm_model) {
      toast.error(errors["llm_model"].message as Message);
    } else if (errors.text_processing_option) {
      toast.error(errors["text_processing_option"].message as Message);
    } else if (errors.api_token) {
      toast.error(errors["api_token"].message as Message);
    }
  }, [errors]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={`input-container ${option}`}>
          <input
            {...register("video_url")}
            type="text"
            placeholder={`Paste Youtube Video URL here`}
            className={option === "upload" ? "input disable" : "input"}
          />
          <input
            {...register("file")}
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
          <div className="transcription-options">
            <select
              {...register("whisper_size")}
              id="whisper"
              className="btn-select"
              defaultValue=""
            >
              <option value="" disabled hidden>
                Select a size
              </option>
              <option value="tiny">Whisper Tiny</option>
              <option value="small">Whisper Small</option>
              <option value="medium">Whisper Medium</option>
              <option value="large-v1">Whisper Large V1</option>
              <option value="large-v2">Whisper Large V2</option>
            </select>
          </div>
          <hr className="horizontal-line" />
          <h4>AI Model</h4>
          <div className="ai-options">
            <select
              {...register("llm_model")}
              className="btn-select"
              id="llm_model"
              defaultValue=""
            >
              <option value="" disabled hidden>
                Select a model
              </option>
              <option value="gpt3">GPT-3</option>
              <option value="gemini">Gemini</option>
            </select>
          </div>
          <hr className="horizontal-line" />
          <h4>Text processing option</h4>
          <div className="text-processing-options">
            <select
              {...register("text_processing_option")}
              className="btn-select"
              id="text_processing_option"
              defaultValue=""
            >
              <option value="" disabled hidden>
                Select a processing option
              </option>
              <option value="summarizing">Summarizing</option>
              <option value="classifying">Classifying</option>
            </select>
          </div>
        </div>
        <hr className="horizontal-line" />
        <h3>AI KEY</h3>
        <div className={`input-container key`}>
          <input
            {...register("api_token")}
            type="text"
            placeholder={`Paste your respective AI Model key`}
            className="input"
          />
        </div>
        <hr className="horizontal-line" />
        <button className="btn-submit" disabled={isSubmitting} type="submit">
          {isSubmitting ? "Loading" : "Submit"}
        </button>
      </form>
    </>
  );
};

export default FormContent;
