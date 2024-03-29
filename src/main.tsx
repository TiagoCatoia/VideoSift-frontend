import ReactDOM from "react-dom/client";
import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);

// Remove Preload scripts loading
postMessage({ payload: "removeLoading" }, "*");

// Use contextBridge
window.ipcRenderer.on(
  "main-process-message",
  (_event: Electron.IpcRendererEvent, message: string) => {
    console.log(message);
  }
);
