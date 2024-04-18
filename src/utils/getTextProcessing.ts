import axios from "axios";
import { AppConfig } from "../types/config-type";

export const getTextProcessing = async (newConfig: AppConfig) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = await fetch(
      "http://localhost:8000/summarize-video/upload",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newConfig),
      }
    );
    if (!response.ok) {
      throw new Error("Erro ao fazer upload do arquivo");
    }
    const data = await response.json();
    return data;
    console.log(data);
  } catch (error) {
    console.error("Erro:", error);
  }
};
