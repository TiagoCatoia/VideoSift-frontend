import { useContext, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { getTextProcessing } from "../utils/getTextProcessing";
import { AppConfig } from "../types/config-type";

import "./DisplayArea.css";

const DisplayArea = ({ appConfig }: { appConfig: AppConfig | undefined }) => {
  // console.log(newConfig?.inputValueVideo.get("video"));

  const queryFn = () => (appConfig ? getTextProcessing(appConfig) : null);

  const { data, isLoading, error, isSuccess } = useQuery({
    queryKey: [appConfig],
    queryFn: queryFn,
    staleTime: 0,
    retry: false,
    refetchOnWindowFocus: false,
  });

  // toast.loading(JSON.stringify(error.message));
  // onSuccess no useQuery
  useEffect(() => {
    toast.remove();
    if (isSuccess && data) {
      toast.success(data.message);
    }
    if (error) {
      toast.error(error.message);
    }
  }, [error, appConfig, isSuccess]);

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
          value={data ? JSON.stringify(data) : ""}
        ></textarea>
      </div>
      <Toaster position="bottom-right" />
    </div>
  );
};

export default DisplayArea;
