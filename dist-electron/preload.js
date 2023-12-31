"use strict";
const electron = require("electron");
const GET_PATH_CHANNEL = "getPath";
const GET_APP_PATH_CHANNEL = "getAppPath";
electron.contextBridge.exposeInMainWorld("ipcRenderer", withPrototype(electron.ipcRenderer));
function withPrototype(obj) {
  const protos = Object.getPrototypeOf(obj);
  for (const [key, value] of Object.entries(protos)) {
    if (Object.prototype.hasOwnProperty.call(obj, key))
      continue;
    if (typeof value === "function") {
      obj[key] = function(...args) {
        return value.call(obj, ...args);
      };
    } else {
      obj[key] = value;
    }
  }
  return obj;
}
function domReady(condition = ["complete", "interactive"]) {
  return new Promise((resolve) => {
    if (condition.includes(document.readyState)) {
      resolve(true);
    } else {
      document.addEventListener("readystatechange", () => {
        if (condition.includes(document.readyState)) {
          resolve(true);
        }
      });
    }
  });
}
const safeDOM = {
  append(parent, child) {
    if (!Array.from(parent.children).find((e) => e === child)) {
      parent.appendChild(child);
    }
  },
  remove(parent, child) {
    if (Array.from(parent.children).find((e) => e === child)) {
      parent.removeChild(child);
    }
  }
};
function useLoading() {
  const className = `loaders-css__square-spin`;
  const styleContent = `
@keyframes square-spin {
  25% { transform: perspective(100px) rotateX(180deg) rotateY(0); }
  50% { transform: perspective(100px) rotateX(180deg) rotateY(180deg); }
  75% { transform: perspective(100px) rotateX(0) rotateY(180deg); }
  100% { transform: perspective(100px) rotateX(0) rotateY(0); }
}
.${className} > div {
  animation-fill-mode: both;
  width: 50px;
  height: 50px;
  background: #fff;
  animation: square-spin 3s 0s cubic-bezier(0.09, 0.57, 0.49, 0.9) infinite;
}
.app-loading-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #282c34;
  z-index: 9;
}
    `;
  const oStyle = document.createElement("style");
  const oDiv = document.createElement("div");
  oStyle.id = "app-loading-style";
  oStyle.innerHTML = styleContent;
  oDiv.className = "app-loading-wrap";
  oDiv.innerHTML = `<div class="${className}"><div></div></div>`;
  return {
    appendLoading() {
      safeDOM.append(document.head, oStyle);
      safeDOM.append(document.body, oDiv);
    },
    removeLoading() {
      safeDOM.remove(document.head, oStyle);
      safeDOM.remove(document.body, oDiv);
    }
  };
}
const { appendLoading, removeLoading } = useLoading();
domReady().then(appendLoading);
window.onmessage = (ev) => {
  ev.data.payload === "removeLoading" && removeLoading();
};
setTimeout(removeLoading, 4999);
electron.contextBridge.exposeInMainWorld("dialogAPI", {
  showMessageBox: (config) => electron.ipcRenderer.invoke("messageBox", config),
  showErrorBox: (title, content) => {
    electron.ipcRenderer.invoke("errorBox", title, content);
  },
  showSaveDialog: (options) => {
    return electron.ipcRenderer.invoke("showSaveDialog", options);
  },
  showOpenDialog: (options) => {
    return electron.ipcRenderer.invoke("showOpenDialog", options);
  }
});
electron.contextBridge.exposeInMainWorld("interfaceAPI", {
  minimizeApp: () => electron.ipcRenderer.invoke("minimizeWindow"),
  maximizeApp: () => electron.ipcRenderer.invoke("maximizeWindow")
});
electron.contextBridge.exposeInMainWorld("supabaseAPI", {
  signInWithGoogle: () => electron.ipcRenderer.invoke("signInWithGoogle"),
  signInWithFacebook: () => electron.ipcRenderer.invoke("signInWithFacebook"),
  signInWithSpotify: () => electron.ipcRenderer.invoke("signInWithSpotify"),
  signInWithDiscord: () => electron.ipcRenderer.invoke("signInWithDiscord")
});
electron.contextBridge.exposeInMainWorld("restAPI", {
  downloadFile: (url) => electron.ipcRenderer.invoke("downloadFile", url)
});
electron.contextBridge.exposeInMainWorld("downloadAPI", {
  downloadUrl: (config) => {
    const { url, downloadOptions, directory } = config;
    const uuid = self.crypto.randomUUID();
    const eventChannel = `downloadUrl-${uuid}`;
    electron.ipcRenderer.invoke(
      "downloadUrl",
      JSON.stringify({ url, downloadOptions, eventChannel, directory })
    );
    electron.ipcRenderer.once(`done-${eventChannel}`, (_, a) => {
      const args = a;
      if (config.callbackOnCompleted) {
        config.callbackOnCompleted(args.state, args.directory);
      }
    });
  }
});
electron.contextBridge.exposeInMainWorld("pathAPI", {
  getPath: async (type) => await electron.ipcRenderer.invoke(GET_PATH_CHANNEL, type),
  getAppPath: async () => await electron.ipcRenderer.invoke(GET_APP_PATH_CHANNEL, "appPath")
});
electron.contextBridge.exposeInMainWorld("shellAPI", {
  openExternal: (url) => electron.ipcRenderer.invoke("openExternal", url)
});
