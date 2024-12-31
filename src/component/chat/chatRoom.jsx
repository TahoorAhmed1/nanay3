import { useState, useEffect, useRef } from 'react';

export default function ChatRoom({ currentUser, selectedUser, messages, sendMessage, newMessage, setNewMessage }) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 flex flex-col">
      <h2 className="text-xl font-semibold p-4 border-b">
        Chat with {selectedUser?.username || selectedUser}
      </h2>
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-4">
          {messages?.map((msg) => (
            <div
              key={msg.id}
              className={`p-3 rounded-lg ${
                msg.senderId === currentUser._id ? 'bg-blue-100 ml-auto' : 'bg-gray-100'
              } max-w-[70%]`}
            >
              <p className="font-semibold">{msg.senderId === currentUser._id ? 'You' : msg.senderId}</p>
              <p className="mt-1">{msg.message}</p>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </p>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="p-4 border-t flex space-x-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          className="flex-grow px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Send
        </button>
      </div>
    </div>
  );
}
