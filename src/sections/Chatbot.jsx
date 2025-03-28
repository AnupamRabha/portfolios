import React, { useState } from 'react';
import axios from 'axios';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const sendMessage = async () => {
    if (input.trim()) {
      const userMessage = input;
      setMessages((prev) => [...prev, { sender: 'You', text: userMessage }]);
      setInput('');

      try {
        const response = await axios.post('http://localhost:3000/chat', {
          message: userMessage,
        });
        const botMessage = response.data.reply;
        setMessages((prev) => [...prev, { sender: 'Anupam', text: botMessage }]);
      } catch (error) {
        console.error('[CLIENT] Error:', error);
        setMessages((prev) => [...prev, { sender: 'Anupam', text: 'Error: Unable to generate response' }]);
      }
    }
  };

  return (
    <div>
      {/* Circular Siri-like button */}
      {!isOpen && (
        <div 
          className="fixed bottom-5 right-5 w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform duration-300"
          onClick={() => setIsOpen(true)}
        >
          <span className="text-white text-3xl">💬</span>
        </div>
      )}

      {/* Chat Box */}
      {isOpen && (
        <div className="fixed bottom-5 right-5 w-80 bg-gray-800 text-white rounded-lg shadow-lg transition-all duration-300">
          <div className="flex justify-between items-center p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-t-lg">
            <h3 className="text-lg font-bold">Chat with Me!</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-red-400 text-2xl font-bold hover:text-red-600"
            >
              ❌
            </button>
          </div>
          <div className="p-2 h-64 overflow-y-auto bg-gray-700 rounded-b-lg">
            {messages.map((msg, index) => (
              <div key={index} className={`my-1 ${msg.sender === 'Anupam' ? 'text-blue-300' : 'text-green-300'}`}>
                <strong>{msg.sender}:</strong> {msg.text}
              </div>
            ))}
          </div>
          <div className="p-2 bg-gray-700 flex">
            <input
              type="text"
              className="flex-grow p-2 bg-gray-600 text-white rounded-l focus:outline-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="bg-blue-500 px-3 text-white rounded-r hover:bg-blue-600"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
