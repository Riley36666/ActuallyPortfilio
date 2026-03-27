// Create backend for Emails and crap


import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Admin() {
  const [authenticated, setAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [messages, setMessages] = useState([]);

  const PASSWORD = "RileyAdmin123"; // need to handle this backend whenever i can be asked

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("messages") || "[]");
    setMessages(stored);
  }, []);

  function handleLogin(e) {
    e.preventDefault();
    if (passwordInput === PASSWORD) {
      setAuthenticated(true);
    } else {
      alert("Incorrect password");
    }
  }

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
