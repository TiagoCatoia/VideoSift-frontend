export const getTextProcessing = async (
  formData: FormData,
  setLoadingStatus: any
) => {
  try {
    const response = await fetch("http://localhost:8800/summarize-video/", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "text/event-stream",
      },
    });

    if (!response.ok || !response.body) throw new Error("Failed to fetch data");

    const reader = response.body
      .pipeThrough(new TextDecoderStream())
      .getReader();

    let parsedResponse;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      parsedResponse = JSON.parse(value);
      setLoadingStatus(parsedResponse.status);
    }
    return parsedResponse;
  } catch (error: any) {
    console.error("Error:", error);
    throw new Error(error.toString());
  }
};
