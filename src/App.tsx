import { useState } from "react";

import Header from "./components/Header";
import ResultViewer from "./components/ResultViewer";
import { Forms } from "./components/forms";
import { Toaster } from "react-hot-toast";

import "./App.css";

function App() {
  const [formData, setFormData] = useState<FormData | undefined>(undefined);

  return (
    <>
      <Header />
      <div className="main-content-container">
        <Forms.FormRoot setFormData={setFormData} />
        <ResultViewer formData={formData} />
      </div>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            boxShadow: "none",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            color: "#fff",
            borderRadius: "8px",
          },
        }}
      />
    </>
  );
}

export default App;
