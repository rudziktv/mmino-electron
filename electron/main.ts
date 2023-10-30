import { app, BrowserWindow, ipcMain, MessageBoxOptions } from "electron";
import { dialog } from "electron";
import path from "node:path";

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
process.env.DIST = path.join(__dirname, "../dist");
process.env.VITE_PUBLIC = app.isPackaged
    ? process.env.DIST
    : path.join(process.env.DIST, "../public");

let win: BrowserWindow | null;
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];

function createWindow() {
    win = new BrowserWindow({
        icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            // contextIsolation: false,
            nodeIntegration: true,
            sandbox: false,
            // enableRemoteModule: true,
            // devTools: true
        },
        titleBarStyle: "hidden",
        // titleBarOverlay: {
        //     color: "#00000000",
        //     symbolColor: "#ffffff",
        //     height: 32,
        // },
        // frame: false,
    });

    // Test active push message to Renderer-process.
    win.webContents.on("did-finish-load", () => {
        win?.webContents.send(
            "main-process-message",
            new Date().toLocaleString()
        );
    });

    if (VITE_DEV_SERVER_URL) {
        win.loadURL(VITE_DEV_SERVER_URL);
    } else {
        // win.loadFile('dist/index.html')
        win.loadFile(path.join(process.env.DIST, "index.html"));
    }
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
        win = null;
    }
});

app.on("activate", () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

app.whenReady().then(() => {
    ipcMain.handle("messageBox", (_, config: MessageBoxOptions) => {
        dialog["showMessageBox"](config);
    });

    ipcMain.handle("errorBox", (_, title: string, content: string) => {
        dialog["showErrorBox"](title, content);
    });

    ipcMain.handle("minimizeWindow", () => {
        win?.minimize();
    });

    ipcMain.handle("maximizeWindow", () => {
        if (win?.isMaximized()) {
            win?.unmaximize();
        } else {
            win?.maximize();
        }
    });

    createWindow();
});

ipcMain.on("minimizeWindow", () => {
    win?.minimize();
});
