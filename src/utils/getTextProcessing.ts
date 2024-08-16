import axios from "axios";
import { AppConfig } from "../types/config-type";

export const getTextProcessing = async (file: AppConfig) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const response = await fetch("http://localhost:8000/summarize-video/", {
      method: "POST",
      body: file.inputValueVideo,
    });

    if (!response.ok) {
      throw new Error("It wasn't possible to upload the file");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    if (error) {
      throw new Error(error.toString());
    }
  }
};
