import { App, BrowserWindow, DownloadItem, DownloadURLOptions } from "electron";

const DownloadFileHandler = (
    window: BrowserWindow | null,
    config: DownloadConfigMain
) => {
    if (window) {
        window.webContents.session.downloadURL(
            config.url,
            config.downloadOptions
        );

        window.webContents.session.on("will-download", (_, item) => {
            if (item.getURL() === config.url) {
                if (config.directory) {
                    item.setSavePath(config.directory);
                }

                item.on("updated", (_, state) => {
                    const args: DownloadUpdatedArgs = {
                        state: state,
                        data: {
                            receivedBytes: item.getReceivedBytes(),
                            totalBytes: item.getTotalBytes(),
                            filename: item.getFilename(),
                        },
                    };

                    window.webContents.send(
                        `updated-${config.eventChannel}`,
                        args
                    );
                });

                item.once("done", (_, state) => {
                    const args: DownloadCompletedArgs = {
                        state: state,
                        directory: item.getSavePath(),
                    };

                    window.webContents.send(
                        `done-${config.eventChannel}`,
                        args
                    );
                });
            }
        });
    }
};

const DOWNLOAD_URL_CHANNEL = "downloadUrl";

export interface DownloadConfig {
    url: string;
    // callback: DownloadCallback;
    callbackOnUpdated?: DownloadUpdatedCallback;
    callbackOnCompleted?: DownloadCompletedCallback;
    directory?: string;
    downloadOptions?: DownloadURLOptions;
}

export interface DownloadConfigMain {
    url: string;
    eventChannel: string;
    directory?: string;
    downloadOptions?: DownloadURLOptions;
}

export type DownloadCallback = (
    item: DownloadItem
    // webContents: WebContents,
    // app: App
) => void;

export type DownloadUpdatedCallback = (
    state: "progressing" | "interrupted",
    data: {
        receivedBytes: number;
        totalBytes: number;
        filename: string;
    }
) => void;

export type DownloadUpdatedArgs = {
    state: "progressing" | "interrupted";
    data: {
        receivedBytes: number;
        totalBytes: number;
        filename: string;
    };
};

export type DownloadCompletedArgs = {
    state: "interrupted" | "completed" | "cancelled";
    directory?: string;
};

export type DownloadCompletedCallback = (
    state: "interrupted" | "completed" | "cancelled",
    directory?: string
) => void;

export interface DownloadIpcRendererProps {
    config: DownloadConfig;
}

export { DownloadFileHandler, DOWNLOAD_URL_CHANNEL };
