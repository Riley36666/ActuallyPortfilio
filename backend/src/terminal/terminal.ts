import { WebSocketServer, WebSocket } from "ws";
import * as pty from "node-pty";

export function setupTerminal(wss: WebSocketServer) {
  wss.on("connection", (ws: WebSocket) => {


    const shell =
      process.platform === "win32"
        ? "powershell.exe"
        : process.env.SHELL || "bash";

    const ptyProcess = pty.spawn(shell, [], {
      name: "xterm-256color",
      cols: 80,
      rows: 30,
      cwd: process.cwd(),
      env: process.env,
    });

    ptyProcess.onData((data: string) => {
      ws.send(data.toString());
    });

    ws.on("message", (msg: WebSocket.RawData) => {
      try {
        const data = JSON.parse(msg.toString());

        if (data.type === "resize") {
          ptyProcess.resize(data.cols, data.rows);
          return;
        }
      } catch {
        ptyProcess.write(msg.toString());
      }
    });

    ws.on("close", () => {
      ptyProcess.kill();
    });
  });
}