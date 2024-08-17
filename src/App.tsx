import { useState } from "react";

import Header from "./components/Header";
import DisplayArea from "./components/DisplayArea";
import { Forms } from "./components/forms";

import "./App.css";

function App() {
  const [formData, setFormData] = useState<FormData | undefined>(undefined);

  return (
    <>
      <Header />
      <div className="main-content-container">
        <Forms.FormRoot setFormData={setFormData} />
        <DisplayArea formData={formData} />
      </div>
    </>
  );
}

export default App;
