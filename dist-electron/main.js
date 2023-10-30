"use strict";
const electron = require("electron");
const path = require("node:path");
process.env.DIST = path.join(__dirname, "../dist");
process.env.VITE_PUBLIC = electron.app.isPackaged ? process.env.DIST : path.join(process.env.DIST, "../public");
let win;
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
function createWindow() {
  win = new electron.BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      // contextIsolation: false,
      nodeIntegration: true,
      sandbox: false
      // enableRemoteModule: true,
      // devTools: true
    },
    titleBarStyle: "hidden"
    // titleBarOverlay: {
    //     color: "#00000000",
    //     symbolColor: "#ffffff",
    //     height: 32,
    // },
    // frame: false,
  });
  win.webContents.on("did-finish-load", () => {
    win == null ? void 0 : win.webContents.send(
      "main-process-message",
      (/* @__PURE__ */ new Date()).toLocaleString()
    );
  });
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(process.env.DIST, "index.html"));
  }
}
electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    electron.app.quit();
    win = null;
  }
});
electron.app.on("activate", () => {
  if (electron.BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
electron.app.whenReady().then(() => {
  electron.ipcMain.handle("messageBox", (_, config) => {
    electron.dialog["showMessageBox"](config);
  });
  electron.ipcMain.handle("errorBox", (_, title, content) => {
    electron.dialog["showErrorBox"](title, content);
  });
  electron.ipcMain.handle("minimizeWindow", () => {
    win == null ? void 0 : win.minimize();
  });
  electron.ipcMain.handle("maximizeWindow", () => {
    if (win == null ? void 0 : win.isMaximized()) {
      win == null ? void 0 : win.unmaximize();
    } else {
      win == null ? void 0 : win.maximize();
    }
  });
  createWindow();
});
electron.ipcMain.on("minimizeWindow", () => {
  win == null ? void 0 : win.minimize();
});
