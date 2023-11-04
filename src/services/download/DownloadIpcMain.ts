import { App, BrowserWindow, DownloadItem, DownloadURLOptions } from "electron";

const DownloadFileHandler = (
    window: BrowserWindow | null,
    app: App,
    config: DownloadConfigMain
) => {
    if (window) {
        window.webContents.session.downloadURL(
            config.url,
            config.downloadOptions
        );

        window.webContents.session.on(
            "will-download",
            (_, item, webContents) => {
                if (item.getURL() === config.url) {
                    if (config.directory) {
                        item.setSavePath(config.directory);
                    }

                    item.on("updated", (_, state) => {
                        window.webContents.send(
                            `updated-${config.eventChannel}`,
                            2
                        );

                        item.getTotalBytes();
                        item.getFilename();
                    });

                    item.once("done", (_, state) => {
                        window.webContents.send(
                            `done-${config.eventChannel}`,
                            2
                        );
                    });

                    // window.webContents.send(config.eventChannel, 2);
                }
            }
        );
    }
};

const DOWNLOAD_URL_CHANNEL = "downloadUrl";

export interface DownloadConfig {
    url: string;
    callback: DownloadCallback;
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

export type DownloadCompletedCallback = (
    state: "interrupted" | "completed" | "cancelled"
) => void;

export interface DownloadIpcRendererProps {
    config: DownloadConfig;
}

export { DownloadFileHandler, DOWNLOAD_URL_CHANNEL };
