import WebSocket, { WebSocketServer } from "ws";

// 创建WS服务
const wss = new WebSocketServer({
  port: 3000
});

console.log("WebSocket服务已启动: ws://127.0.0.1:3000");

// 客户端连接
wss.on("connection", (ws: WebSocket) => {
  console.log("新客户端连接成功");

  // 接收客户端消息
  ws.on("message", (buffer: Buffer) => {
    const text = buffer.toString();
    console.log("收到消息:", text);

    // 单发消息给当前客户端
    ws.send(JSON.stringify({
      code: 200,
      msg: "服务端已收到",
      data: text
    }));

    // 全员广播
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({
          type: "broadcast",
          content: text
        }));
      }
    });
  });

  // 连接关闭
  ws.on("close", () => {
    console.log("客户端断开连接");
  });

  // 捕获异常
  ws.on("error", (err) => {
    console.error("连接异常：", err);
  });

  // 欢迎语
  ws.send(JSON.stringify({ code: 0, msg: "连接建立成功" }));
});