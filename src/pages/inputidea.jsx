import { useState } from "react";

const InputIdea = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === "") return;

    // Add new message to list
    setMessages((prev) => [...prev, { text: input, from: "user" }]);
    setInput(""); // clear input
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-purple-50 to-purple-100">
      {/* Header */}
      <div className="p-4 shadow-md bg-white border-b text-center text-xl font-semibold text-purple-700">
        Idea Input Assistant
      </div>

      {/* Messages container */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.length === 0 ? (
          <p className="text-center text-gray-500 italic">
            Start by typing your idea below...
          </p>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`max-w-lg px-4 py-3 rounded-xl ${
                msg.from === "user"
                  ? "bg-purple-600 text-white self-end ml-auto"
                  : "bg-white text-gray-800 self-start"
              } shadow`}
            >
              {msg.text}
            </div>
          ))
        )}
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 border-t flex gap-3 items-center"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your idea..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <button
          type="submit"
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition font-medium"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default InputIdea;
