import axios from "axios";

export const getTextProcessing = async <AppConfig>(newConfig: AppConfig) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = await axios.get("/text-processing", {
      params: newConfig,
    });
    const processedText = response.data.processedText;
    return { processedText };
  } catch (error) {
    throw error;
  }
};
