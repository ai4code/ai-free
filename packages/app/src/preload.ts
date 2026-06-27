// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("api", {
  runCode: (webContentId: number, jsStr: string) => {
    return ipcRenderer.invoke("exec-webview-js", webContentId, jsStr);
  },
});

contextBridge.exposeInMainWorld("electronAPI", {
  // 向Vue主进程发送消息
  sendToHost: (channel: string, data: unknown) => {
    ipcRenderer.sendToHost(`${channel}`, data);
  },
});
