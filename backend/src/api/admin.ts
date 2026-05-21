import express, { Request, Response } from "express";
import {getPublicIP, getPcInfo, getUser, returnInfo} from './HelperFunctions';
import { auth } from './Auth'
const router = express.Router();
import fs from "fs";
import path from "path";
import crypto from "crypto";


router.post("/Password", async (req, res) => {
  const { password } = req.body;
  const backendPass = process.env.PASSWORD;

  if (password === backendPass) {
    const token = crypto.randomBytes(32).toString("hex");
    try {
      await fs.promises.writeFile(path.join(__dirname, "../data/session.json"), JSON.stringify({ token }), { encoding: "utf-8" });
      return res.json({ success: true, token });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, error: "Failed to store token" });
    }
  }

  res.json({ success: false });
});


router.post("/addMessages", async (req: Request, res: Response) => {
  const { name, email, message } = req.body;
  const filePath = path.join(__dirname, "../data/messages.json");
  try {
    const raw = await fs.promises.readFile(filePath, "utf-8");
    const messages = JSON.parse(raw);
    messages.push({ name, email, message, date: new Date().toISOString() });
    await fs.promises.writeFile(filePath, JSON.stringify(messages, null, 2), "utf-8");
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Failed to save message" });
  }
});

router.get("/returnMessages", auth, async (req: Request, res: Response) => {
  const filePath = path.join(__dirname, "../data/messages.json");
  try {
    const raw = await fs.promises.readFile(filePath, "utf-8");
    const messages = JSON.parse(raw);
    res.send(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to read messages" });
  }
})







router.get("/info", auth, async(req: Request, res: Response) => {
  try {
    const data = await returnInfo();
    res.json({data});
  } catch (err) {
    console.error(err);
  }
})

export default router