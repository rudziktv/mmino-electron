"use strict";
const electron = require("electron");
const path = require("node:path");
const DownloadFileHandler = (window, config) => {
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
        item.on("updated", (_2, state) => {
          const args = {
            state,
            data: {
              receivedBytes: item.getReceivedBytes(),
              totalBytes: item.getTotalBytes(),
              filename: item.getFilename()
            }
          };
          window.webContents.send(
            `updated-${config.eventChannel}`,
            args
          );
        });
        item.once("done", (_2, state) => {
          const args = {
            state,
            directory: item.getSavePath()
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
const GET_PATH_CHANNEL = "getPath";
const GET_APP_PATH_CHANNEL = "getAppPath";
const openExternalMain = (shell, url) => {
  shell.openExternal(url);
};
const OPEN_EXTERNAL_CHANNEL = "openExternal";
process.env.DIST = path.join(__dirname, "../dist");
process.env.VITE_PUBLIC = electron.app.isPackaged ? process.env.DIST : path.join(process.env.DIST, "../public");
let win;
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
function createWindow() {
  win = new electron.BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      sandbox: false
      // contextIsolation: false,
      // enableRemoteModule: true,
      // devTools: true
    },
    titleBarStyle: "hidden",
    minWidth: 1e3,
    minHeight: 500
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
  electron.ipcMain.handle(OPEN_EXTERNAL_CHANNEL, (_, url) => {
    openExternalMain(electron.shell, url);
  });
  electron.ipcMain.handle("signInWithGoogle", () => {
    const testWin = new electron.BrowserWindow({
      webPreferences: {
        preload: path.join(__dirname, "preload.js"),
        // contextIsolation: false,
        nodeIntegration: true,
        sandbox: false,
        webSecurity: false
        // enableRemoteModule: true,
        // devTools: true
      }
    });
    if (VITE_DEV_SERVER_URL) {
      testWin.loadURL(
        `${VITE_DEV_SERVER_URL}app/auth/login/google/twojastara`
      );
    }
  });
  createWindow();
  electron.ipcMain.handle("downloadFile", (_, url) => {
    win == null ? void 0 : win.webContents.session.downloadURL(url);
  });
  electron.ipcMain.handle("downloadUrl", (_, configJSON) => {
    const config = JSON.parse(configJSON);
    DownloadFileHandler(win, config);
  });
  electron.ipcMain.handle(GET_PATH_CHANNEL, (_, type) => {
    return electron.app.getPath(type);
  });
  electron.ipcMain.handle(GET_APP_PATH_CHANNEL, () => {
    return electron.app.getAppPath();
  });
  electron.ipcMain.handle(
    "showSaveDialog",
    async (_, options) => {
      return await electron.dialog.showSaveDialog(options);
    }
  );
  electron.ipcMain.handle(
    "showOpenDialog",
    async (_, options) => {
      return await electron.dialog.showOpenDialog(options);
    }
  );
});
electron.ipcMain.on("minimizeWindow", () => {
  win == null ? void 0 : win.minimize();
});
