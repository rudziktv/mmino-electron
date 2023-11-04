import { PathTypes } from "./PathIpcMain";

const { getPath, getAppPath } = (window as any)["pathAPI"] as PathAPI;

interface PathAPI {
    getPath: (type: PathTypes) => Promise<string>;
    getAppPath: () => Promise<string>;
}

export { getPath, getAppPath };
