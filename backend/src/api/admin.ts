import express, { Request, Response } from "express";
const router = express.Router();
import fs from "fs";
import path from "path";
import crypto from "crypto";


function auth(req: Request, res: Response, next: () => any) {
  const clientToken = req.headers["x-admin-token"];
  const filePath = path.join(__dirname, "../data/session.json");

  if (!fs.existsSync(filePath)) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  const { token } = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  if (clientToken === token) {
    return next();
  }

  res.status(401).json({ error: "Invalid token" });
}


router.post("/Password", (req, res) => {
  const { password } = req.body;
  const backendPass = process.env.PASSWORD;

  if (password === backendPass) {
    const token = crypto.randomBytes(32).toString("hex");


    fs.writeFileSync(
      path.join(__dirname, "../data/session.json"),
      JSON.stringify({ token })
    );

    return res.json({ success: true, token });
  }

  res.json({ success: false });
});


router.post("/addMessages", (req: Request, res: Response) => {
  const { name, email, message } = req.body;

  const filePath = path.join(__dirname, "../data/messages.json");

  const raw = fs.readFileSync(filePath, "utf-8");
  const messages = JSON.parse(raw);

  messages.push({
    name,
    email,
    message,
    date: new Date().toISOString()
  });

  fs.writeFileSync(filePath, JSON.stringify(messages, null, 2));

  res.json({ success: true });
});

router.get("/returnMessages", auth, (req: Request, res: Response) => {
    const filePath = path.join(__dirname, "../data/messages.json");
    const raw = fs.readFileSync(filePath, "utf-8");
    const messages = JSON.parse(raw);
    res.send(messages)
})

export default router