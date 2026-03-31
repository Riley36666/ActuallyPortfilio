import { useEffect, useRef, useState } from "react";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import AdminLogin from "../components/login";
import "xterm/css/xterm.css";


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


export default function TerminalPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const terminalRef = useRef(null);

  async function handleLogin(e) {
    e.preventDefault();

    const ok = await checkPassword(passwordInput);

    if (ok) {
      setAuthenticated(true);



    }
  }

  useEffect(() => {
  if (!authenticated) return;

  const term = new Terminal({
    cursorBlink: true,
    fontSize: 14,
    theme: {
      background: "#00000",
    },
  });

  const fitAddon = new FitAddon();
  term.loadAddon(fitAddon);

  if (!terminalRef.current) return;

  term.open(terminalRef.current);

  setTimeout(() => {
    fitAddon.fit();
  }, 0);

  const resizeObserver = new ResizeObserver(() => {
    fitAddon.fit();
  });

  resizeObserver.observe(terminalRef.current);

  const wsUrl =
    import.meta.env.VITE_WS_URL ||
    `wss://${window.location.host}`;

  const ws = new WebSocket(wsUrl);

  let isReady = false;
  let buffer = [];

  ws.onmessage = (event) => {
    term.write(event.data);
  };

  term.onData((data) => {
    if (!isReady) {
      buffer.push(data);
      return;
    }
    ws.send(data);
  });

  ws.onopen = () => {
    isReady = true;
    term.write("Connected to terminal\r\n");

    buffer.forEach((d) => ws.send(d));
    buffer = [];
  };

  ws.onclose = () => {
    isReady = false;
    term.write("\r\nDisconnected\r\n");
  };

  ws.onerror = () => {
    term.write("\r\nConnection error\r\n");
  };

  return () => {
    resizeObserver.disconnect();
    ws.close();
    term.dispose();
  };
}, [authenticated]);


  if(!authenticated) {
        return (
          <AdminLogin
            password={passwordInput}
            setPassword={setPasswordInput}
            onLogin={handleLogin}
          />
        );
  }


  if(authenticated) {return (
    <div style={{ height: "150vh", width: "100vw", overflow: "hidden" }}>
      <div
        ref={terminalRef}
        style={{ height: "100%", width: "100%" }}
      />
    </div>
  );
}}