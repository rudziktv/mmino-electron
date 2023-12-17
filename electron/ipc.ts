import { MessageBoxOptions } from "electron";

const { showMessageBox, showErrorBox, showSaveDialog, showOpenDialog } = (
    window as any
)["dialogAPI"] as DialogAPI;
const { minimizeApp, maximizeApp } = (window as any)[
    "interfaceAPI"
] as InterfaceAPI;

const {
    signInWithGoogle,
    signInWithFacebook,
    signInWithSpotify,
    signInWithDiscord,
} = (window as any)["supabaseAPI"] as SupabaseAPI;

const { downloadFile } = (window as any)["restAPI"] as RestAPI;

export {
    showMessageBox,
    showErrorBox,
    showSaveDialog,
    showOpenDialog,
    minimizeApp,
    maximizeApp,
    signInWithGoogle,
    signInWithFacebook,
    signInWithSpotify,
    signInWithDiscord,
    downloadFile,
};

interface DialogAPI {
    showMessageBox: (config: MessageBoxOptions) => void;
    showErrorBox: (title: string, content: string) => void;
    showSaveDialog: (
        options: Electron.SaveDialogOptions
    ) => Promise<Electron.SaveDialogReturnValue>;
    showOpenDialog: (
        options: Electron.OpenDialogOptions
    ) => Promise<Electron.OpenDialogReturnValue>;
}

interface InterfaceAPI {
    minimizeApp: () => void;
    maximizeApp: () => void;
}

interface SupabaseAPI {
    signInWithGoogle: () => void;
    signInWithFacebook: () => void;
    signInWithSpotify: () => void;
    signInWithDiscord: () => void;
}

interface RestAPI {
    downloadFile: (url: string) => void;
}
