import { useContext, useEffect } from "react";
import { AppConfigContext } from "../App";
import toast, { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { getTextProcessing } from "../utils/getTextProcessing";

import "./DisplayArea.css";

const DisplayArea = () => {
  const useAppConfigContext = useContext(AppConfigContext);
  const newConfig = useAppConfigContext?.appConfig;
  const { data, isLoading, error } = useQuery({
    queryKey: [newConfig?.id],
    queryFn: () => (newConfig ? getTextProcessing(newConfig) : null),
    staleTime: 0,
    retry: false,
    refetchOnWindowFocus: false,
    //refetchOnMount: false,
    //retryOnMount: false,
  });

  // toast.loading(JSON.stringify(error.message));
  // onSuccess no useQuery
  useEffect(() => {
    toast.remove();
    if (error) {
      toast.error(error.message);
    }
    console.log(error);
  }, [error, newConfig]);

  if (isLoading) {
    return (
      <div className="display-area-container">
        <div className="text-input-container">
          <div className="loader"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="display-area-container">
      <div className="text-input-container">
        <textarea
          className="text-input"
          placeholder={
            isLoading ? "Loading..." : "Your text will appear here..."
          }
          readOnly
          value={data ? JSON.stringify(data.processedText) : ""}
        ></textarea>
      </div>
      <Toaster position="bottom-right" />
    </div>
  );
};

export default DisplayArea;
