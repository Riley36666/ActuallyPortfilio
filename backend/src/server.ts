import dotenv from "dotenv";
import express, { Request, Response } from "express";
import cors from "cors";
import path from "path";
import http from "http";
import adminRoute from "./api/admin"
import { WebSocketServer } from "ws";
import { setupTerminal } from "./terminal/terminal";



dotenv.config();
const PORT = Number(process.env.port) || 9999;
const PORT_TERMINAL = 3001;
const app = express();

const server = http.createServer(app);
const wss = new WebSocketServer({ server });
setupTerminal(wss);

const buildPath = path.resolve(__dirname, "../../frontend/dist");

app.use(cors({ origin: "*" }));
app.use(express.json());


app.use("/admin", adminRoute);


app.use(express.static(buildPath));



// app.get(/.*/, (req: Request, res: Response) => {
//   res.sendFile(path.join(buildPath, "index.html"));
// });

app.get("/", (req:Request, res:Response) => {
  res.send("Hello world");
})

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server started at http://localhost:${PORT}`);
});

