import { useState } from "react";
import { motion } from "framer-motion";
import AdminLogin from "../components/login";

// ---------------------- API HELPERS ----------------------

async function checkPassword(password) {
  try {
    const res = await fetch("/admin/Password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password })
    });

    const data = await res.json();

    if (data?.success && data?.token) {
      localStorage.setItem("adminToken", data.token);
    }

    return data?.success ?? false;
  } catch {
    return false;
  }
}

async function getAllInfo() {
  try {
    const res = await fetch("/admin/info", {
      headers: {
        "x-admin-token": localStorage.getItem("adminToken")
      }
    });

    return await res.json();
  } catch {
    return null;
  }
}

async function getMessages() {
  try {
    const res = await fetch("/admin/returnMessages", {
      headers: {
        "x-admin-token": localStorage.getItem("adminToken")
      }
    });

    return await res.json();
  } catch {
    return [];
  }
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

      const msgs = await getMessages();
      setMessages(msgs ?? []);
      localStorage.setItem("messages", JSON.stringify(msgs ?? []));

      const info = await getAllInfo();
      setSystemInfo(info ?? {});
    }
  }

  // ---------------------- LOGIN SCREEN ----------------------

  if (!authenticated) {
    return (
      <AdminLogin
        password={passwordInput}
        setPassword={setPasswordInput}
        onLogin={handleLogin}
      />
    );
  }

  // ---------------------- SYSTEM INFO SAFETY ----------------------

  const sys = systemInfo?.data ?? {};

  return (
    <div className="min-h-screen bg-black text-white p-10 space-y-12">

      {/* HEADER */}
      <div>
        <h1 className="text-4xl font-bold text-teal-300 mb-2">Admin Dashboard</h1>
        <p className="text-gray-400">Welcome back. Here’s what’s happening.</p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* MESSAGES */}
        <div>
          <h2 className="text-3xl font-bold text-teal-300 mb-4">Messages</h2>

          {messages?.length === 0 ? (
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

          {!systemInfo?.data ? (
            <p className="text-gray-400">Loading system info...</p>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">

              {/* CPU */}
              <div className="bg-gray-900/40 border border-teal-300/40 rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-teal-300 mb-2">CPU</h3>
                <p>Model: {sys.cpu?.model}</p>
                <p className="text-gray-400 text-sm">Load: {sys.cpu?.load}</p>
                <p className="text-gray-400 text-sm">Temperature: {sys.cpu?.temperature}</p>
              </div>

              {/* MEMORY */}
              <div className="bg-gray-900/40 border border-teal-300/40 rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-teal-300 mb-2">Memory</h3>
                <p>Total: {sys.memory?.total}</p>
                <p className="text-gray-400 text-sm">Used: {sys.memory?.used}</p>
                <p className="text-gray-400 text-sm">Free: {sys.memory?.free}</p>
              </div>

              {/* GPU */}
              <div className="bg-gray-900/40 border border-teal-300/40 rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-teal-300 mb-2">GPU</h3>
                {sys.gpu?.map((g, i) => (
                  <div key={i} className="mb-2">
                    <p>{g.model}</p>
                    <p className="text-gray-400 text-sm">Memory: {g.memory}</p>
                    <p className="text-gray-400 text-sm">Temp: {g.temperature}</p>
                  </div>
                ))}
              </div>

              {/* STORAGE */}
              <div className="bg-gray-900/40 border border-teal-300/40 rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-teal-300 mb-2">Storage</h3>
                {sys.Storage?.map((d, i) => (
                  <div key={i} className="mb-2">
                    <p>{d.device}</p>
                    <p className="text-gray-400 text-sm">Size: {d.size}</p>
                    <p className="text-gray-400 text-sm">Used: {d.used}</p>
                  </div>
                ))}

                <h4 className="text-teal-300 font-semibold mt-4 mb-1">Usage</h4>
                {sys.diskUsage?.map((d, i) => (
                  <p key={i} className="text-gray-400 text-sm">{d}</p>
                ))}
              </div>

              {/* OS */}
              <div className="bg-gray-900/40 border border-teal-300/40 rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-teal-300 mb-2">Operating System</h3>
                <p>{sys.OS}</p>
                <p className="text-gray-400 text-sm">Kernel: {sys.kernel}</p>
                <p className="text-gray-400 text-sm">Uptime: {sys.uptime}</p>
              </div>

              {/* NETWORK */}
              <div className="bg-gray-900/40 border border-teal-300/40 rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-teal-300 mb-2">Network</h3>

                <h4 className="text-teal-300 font-semibold mb-1">Interfaces</h4>
                {sys.networkInterfaces?.map((n, i) => (
                  <div key={i} className="mb-2">
                    <p>{n.name}</p>
                    <p className="text-gray-400 text-sm">IP: {n.ip}</p>
                    <p className="text-gray-400 text-sm">MAC: {n.mac}</p>
                  </div>
                ))}

                <h4 className="text-teal-300 font-semibold mt-4 mb-1">Traffic</h4>
                {sys.networkTraffic?.map((n, i) => (
                  <div key={i} className="mb-2">
                    <p className="text-gray-400 text-sm">RX: {n.rx}</p>
                    <p className="text-gray-400 text-sm">TX: {n.tx}</p>
                  </div>
                ))}
              </div>

              {/* BATTERY */}
              <div className="bg-gray-900/40 border border-teal-300/40 rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-teal-300 mb-2">Battery</h3>
                <p>Percent: {sys.battery?.percent}</p>
                <p className="text-gray-400 text-sm">
                  Charging: {sys.battery?.charging ? "Yes" : "No"}
                </p>
              </div>

            </motion.div>
          )}
        </div>

      </div>
    </div>
  );
}
