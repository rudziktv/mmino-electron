import { App, app } from "electron";

export interface IpcMainHandlerProps {
    app: App;
    win: Window;
}

export type PathTypes =
    | "home"
    | "appData"
    | "userData"
    | "sessionData"
    | "temp"
    | "exe"
    | "module"
    | "desktop"
    | "documents"
    | "downloads"
    | "music"
    | "pictures"
    | "videos"
    | "recent"
    | "logs"
    | "crashDumps";

const getPathContextBridge = (type: PathTypes) => app.getPath(type);
const getAppPathContextBridge = () => app.getAppPath();

const GET_PATH_CHANNEL = "getPath";
const GET_APP_PATH_CHANNEL = "getAppPath";

export {
    getPathContextBridge,
    getAppPathContextBridge,
    GET_PATH_CHANNEL,
    GET_APP_PATH_CHANNEL,
};
