import { MessageBoxOptions } from "electron";

const { showMessageBox, showErrorBox } = (window as any)[
    "dialogAPI"
] as DialogAPI;
const { minimizeApp, maximizeApp } = (window as any)[
    "interfaceAPI"
] as InterfaceAPI;

export { showMessageBox, showErrorBox, minimizeApp, maximizeApp };

interface DialogAPI {
    showMessageBox: (config: MessageBoxOptions) => void;
    showErrorBox: (title: string, content: string) => void;
}

interface InterfaceAPI {
    minimizeApp: () => void;
    maximizeApp: () => void;
}
