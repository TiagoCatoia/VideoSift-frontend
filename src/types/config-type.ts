export type AppConfig = {
  id: string;
  inputValueVideoPath: string;
  selectedAiModels: {
    modelName: string;
    modelSize?: string;
  };
  selectedTranscriptionModels: {
    modelName: string;
    modelSize?: string;
  };
  textProcessingOption: string;
  inputValueKey: string;
};
