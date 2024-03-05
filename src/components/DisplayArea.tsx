import { useContext } from "react";
import { AppConfigContext } from "../App";
import { useFetch } from "../hooks/useFetch";
import { Toaster, toast } from "sonner";

import "./DisplayArea.css";

const DisplayArea = () => {
  const useAppConfigContext = useContext(AppConfigContext);
  const newConfig = useAppConfigContext?.appConfig;

  let data, isLoading, error;

  if (newConfig) {
    ({ data, isLoading, error } = useFetch(newConfig));
  }

  if (error) {
    toast.error("Error processing video");
  }

  console.log(newConfig);

  return (
    <div className="display-area-container">
      <div className="text-input-container">
        <h3></h3>
        <textarea
          className="text-input"
          placeholder={
            isLoading ? "Loading..." : "Your text will appear here..."
          }
          readOnly
          value={data ? JSON.stringify(data) : ""}
        ></textarea>
      </div>
      <Toaster richColors />
    </div>
  );
};

export default DisplayArea;
