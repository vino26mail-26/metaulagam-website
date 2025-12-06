import { useState } from "react";
import "./ChatWidget.css";

function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hi! I’m the MetaUlagam helper. Ask anything about courses or batches.",
    },
  ]);

  const handleSend = (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    setMessages((prev) => [...prev, { from: "user", text: trimmed }]);
    setInput("");

    // simple fake reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text:
            "Thanks! I’ll reply in detail once you submit the Enquiry form on the site.",
        },
      ]);
    }, 600);
  };

  if (!open) {
    return (
      <button
        className="chat-launcher"
        onClick={() => setOpen(true)}
        aria-label="Open MetaUlagam helper"
      >
        MU
      </button>
    );
  }

  return (
    <div className="chat-panel">
      <div className="chat-header">
        <div>
          <div className="chat-title">MetaUlagam Helper</div>
          <div className="chat-sub">Course & batch questions</div>
        </div>
        <button
          className="chat-close"
          onClick={() => setOpen(false)}
          aria-label="Close chat"
        >
          ×
        </button>
      </div>

      <div className="chat-body">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`chat-msg ${m.from === "user" ? "user" : "bot"}`}
          >
            {m.text}
          </div>
        ))}
      </div>

      <form className="chat-input-row" onSubmit={handleSend}>
        <input
          type="text"
          placeholder="Ask about VR course, fees, etc..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default ChatWidget;
