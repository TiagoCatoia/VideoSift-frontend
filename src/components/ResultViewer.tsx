import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getTextProcessing } from "../utils/getTextProcessing";
import { marked } from "marked";
import "./ResultViewer.css";

const ResultViewer = ({ formData }: { formData: FormData | undefined }) => {
  const [loadingStatus, setLoadingStatus] = useState<any>("");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (formData) {
        setIsLoading(true);
        try {
          let result = await getTextProcessing(formData, setLoadingStatus);
          console.log(result);
          setIsLoading(false);
          setData(marked(result.summary));
        } catch (error: any) {
          console.log(error);
          setIsLoading(false);
          toast.error(error.message);
        }
      }
    };
    fetchData();
  }, [formData]);

  if (isLoading) {
    return (
      <div className="result-viewer-container">
        <div className="loader-container">
          <div className="loader"></div>
          <p>{loadingStatus || ""}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="result-viewer-container">
      <div className="text-input-container">
        <div
          className="text-input"
          dangerouslySetInnerHTML={{
            __html: data || "The text will appear here...",
          }}
        ></div>
      </div>
    </div>
  );
};

export default ResultViewer;
