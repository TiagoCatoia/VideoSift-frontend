import { createContext, useState } from "react";
import { queryClient } from "./lib/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { AppConfig } from "./types/config-type";

import Header from "./components/Header";
import DisplayArea from "./components/DisplayArea";
import { Forms } from "./components/forms";

import "./App.css";

function App() {
  const [appConfig, setAppConfig] = useState<AppConfig | undefined>(undefined);

  const updateAppConfigValue = (newConfig: AppConfig) => {
    setAppConfig(newConfig);
  };

  return (
    <>
      <Header />
      <div className="main-content-container">
        <QueryClientProvider client={queryClient}>
          <Forms.FormRoot updateAppConfigValue={updateAppConfigValue} />
          <DisplayArea appConfig={appConfig} />
        </QueryClientProvider>
      </div>
    </>
  );
}

export default App;
