import { DownloadConfig } from "./DownloadIpcMain";

const { downloadUrl } = (window as any)["downloadAPI"] as DownloadAPI;

interface DownloadAPI {
    downloadUrl: (config: DownloadConfig) => void;
}

export { downloadUrl };
