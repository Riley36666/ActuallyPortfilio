import { useState } from "react";
import { motion } from "framer-motion";

// ---------------------- API HELPERS ----------------------

async function checkPassword(password) {
  try {
    const res = await fetch("/admin/Password", {
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

async function getAllInfo() {
  const res = await fetch("/admin/info", {
    headers: {
      "x-admin-token": localStorage.getItem("adminToken")
    }
  });
  return await res.json();
}

async function getMessages() {
  const res = await fetch("/admin/returnMessages", {
    headers: {
      "x-admin-token": localStorage.getItem("adminToken")
    }
  });

  return await res.json();
}

// ---------------------- COMPONENT ----------------------

export default function Admin() {
  const [authenticated, setAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [systemInfo, setSystemInfo] = useState(null);

  // LOGIN HANDLER
  async function handleLogin(e) {
    e.preventDefault();

    const ok = await checkPassword(passwordInput);

    if (ok) {
      setAuthenticated(true);

      // Load messages
      const msgs = await getMessages();
      setMessages(msgs);
      localStorage.setItem("messages", JSON.stringify(msgs));

      // Load system info immediately
      const info = await getAllInfo();
      setSystemInfo(info);
    }
  }

  // ---------------------- LOGIN SCREEN ----------------------

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

  // ---------------------- ADMIN DASHBOARD ----------------------

  const sys = systemInfo?.data?.system;

  return (
    <div className="min-h-screen bg-black text-white p-10 space-y-12">

      {/* HEADER */}
      <div>
        <h1 className="text-4xl font-bold text-teal-300 mb-2">Admin Dashboard</h1>
        <p className="text-gray-400">Welcome back. Here’s what’s happening.</p>
      </div>

      {/* GRID LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* MESSAGES */}
        <div>
          <h2 className="text-3xl font-bold text-teal-300 mb-4">Messages</h2>

          {messages.length === 0 ? (
            <p className="text-gray-400">No messages yet.</p>
          ) : (
            <div className="space-y-4">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gray-900/40 border border-teal-300/40 rounded-xl p-6 backdrop-blur-md shadow-lg"
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

        {/* SYSTEM INFO */}
        <div>
          <h2 className="text-3xl font-bold text-teal-300 mb-4">System Info</h2>

          {!sys ? (
            <p className="text-gray-400">Loading system info...</p>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >

              {/* CPU */}
              <div className="bg-gray-900/40 border border-teal-300/40 rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-teal-300 mb-2">CPU</h3>
                <p className="text-gray-300">{sys.cpu.model}</p>
                <p className="text-gray-400 text-sm">{sys.cpu.speed}</p>
                <p className="text-gray-400 text-sm">{sys.cpu.cores} cores</p>
              </div>

              {/* GPU */}
              <div className="bg-gray-900/40 border border-teal-300/40 rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-teal-300 mb-2">GPU</h3>
                <p className="text-gray-300">{sys.gpu.model}</p>
                <p className="text-gray-400 text-sm">{sys.gpu.vram} VRAM</p>
              </div>

              {/* RAM */}
              <div className="bg-gray-900/40 border border-teal-300/40 rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-teal-300 mb-2">RAM</h3>
                <p className="text-gray-300">{sys.ram.total}</p>
              </div>

              {/* STORAGE */}
              <div className="bg-gray-900/40 border border-teal-300/40 rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-teal-300 mb-2">Storage</h3>
                {sys.storage.devices.map((d, i) => (
                  <div key={i} className="mb-3">
                    <p className="text-gray-300 font-semibold">{d.model}</p>
                    <p className="text-gray-400 text-sm">{d.type}</p>
                    <p className="text-gray-400 text-sm">{d.capacity}</p>
                  </div>
                ))}
              </div>

              {/* OS */}
              <div className="bg-gray-900/40 border border-teal-300/40 rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-teal-300 mb-2">Operating System</h3>
                <p className="text-gray-300">{sys.os.name}</p>
                <p className="text-gray-400 text-sm">{sys.os.version}</p>
              </div>

              {/* NETWORK */}
              <div className="bg-gray-900/40 border border-teal-300/40 rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-teal-300 mb-2">Network</h3>
                <p className="text-gray-300">{sys.network.adapter}</p>
                <p className="text-gray-400 text-sm">MAC: {sys.network.mac}</p>
                <p className="text-gray-400 text-sm">IP: {sys.network.ip}</p>
              </div>

            </motion.div>
          )}
        </div>

      </div>
    </div>
  );
}
