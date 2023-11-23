import { Shell } from "electron";

const openExternalMain = (shell: Shell, url: string) => {
    shell.openExternal(url);
};

const OPEN_EXTERNAL_CHANNEL = "openExternal";

export { OPEN_EXTERNAL_CHANNEL, openExternalMain };
