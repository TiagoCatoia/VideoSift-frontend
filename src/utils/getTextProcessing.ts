import axios from "axios";

export const getTextProcessing = async <AppConfig>(newConfig: AppConfig) => {
  try {
    const response = await axios.get("/text-processing", { params: newConfig });
    const processedText = response.data.processedText;

    return { processedText };
  } catch (error) {
    throw error;
  }
};
