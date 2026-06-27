"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("api", {
  runCode: (webContentId, jsStr) => {
    return electron.ipcRenderer.invoke("exec-webview-js", webContentId, jsStr);
  }
});
electron.contextBridge.exposeInMainWorld("electronAPI", {
  // 向Vue主进程发送消息
  sendToHost: (channel, data) => {
    electron.ipcRenderer.sendToHost(`${channel}`, data);
  }
});
