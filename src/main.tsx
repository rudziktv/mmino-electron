import ReactDOM from "react-dom/client";
import "./index.css";
import AppRoot from "./router/AppRoot.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(<AppRoot />);

// Remove Preload scripts loading
postMessage({ payload: "removeLoading" }, "*");

// Use contextBridge
window.ipcRenderer.on("main-process-message", (_event, message) => {
    console.log(message);
});
