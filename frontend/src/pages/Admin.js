import { useState } from "react";
import { motion } from "framer-motion";

async function checkPassword(password) {
  try {
    const res = await fetch("http://localhost:9999/admin/Password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password })
    });

    const data = await res.json();

    if (data.success) {
      localStorage.setItem("adminToken", data.token);
    }

    return data.success;
  } catch {
    return false;
  }
}


async function getMessages() {
  const res = await fetch("http://localhost:9999/admin/returnMessages", {
    headers: {
      "x-admin-token": localStorage.getItem("adminToken")
    }
  });

  return await res.json();
}

export default function Admin() {
  const [authenticated, setAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [messages, setMessages] = useState([]);

  // LOGIN HANDLER
  async function handleLogin(e) {
    e.preventDefault();

    const ok = await checkPassword(passwordInput);

    if (ok) {
      setAuthenticated(true);

      const msgs = await getMessages();
      setMessages(msgs);

      localStorage.setItem("messages", JSON.stringify(msgs));
    } else {
    }
  }

  // LOGIN SCREEN
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-900/40 p-8 rounded-2xl border border-teal-300/40 backdrop-blur-md w-full max-w-sm"
        >
          <h1 className="text-3xl font-bold text-teal-300 mb-4 text-center">
            Admin Login
          </h1>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="password"
              placeholder="Enter admin password"
              className="px-4 py-3 bg-black/40 border border-gray-700 rounded-xl text-white focus:border-teal-300 outline-none"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
            />

            <button className="bg-teal-300 text-black py-3 rounded-xl hover:bg-teal-400 transition">
              Login
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  // ADMIN PANEL
  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold text-teal-300 mb-6">Messages</h1>

      {messages.length === 0 ? (
        <p className="text-gray-400">No messages yet.</p>
      ) : (
        <div className="grid gap-6">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-900/40 border border-teal-300/40 rounded-xl p-6 backdrop-blur-md"
            >
              <p className="text-teal-300 font-semibold">{msg.name}</p>
              <p className="text-gray-400 text-sm">{msg.email}</p>
              <p className="mt-3 text-gray-300">{msg.message}</p>
              <p className="mt-2 text-xs text-gray-500">{msg.date}</p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
