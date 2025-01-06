import React, { useEffect, useRef } from 'react';
import { Send, MoreVertical, ArrowLeft } from 'lucide-react';
import { userLogo } from '../../assets';

export default function ChatRoom({
  user,
  selectedUser,
  currentUser,
  messages,
  sendMessage,
  newMessage,
  setNewMessage,
  goBack
}) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col w-full h-screen bg-gray-50/40 ">
      <div className="flex items-center bg-[#FF6F61] w-full text-white p-2">
        <button onClick={goBack} className="p-2 md:hidden block">
          <ArrowLeft size={24} />
        </button>
        <div className="flex items-center flex-1">
          <img
            src={currentUser.image || userLogo}
            alt={currentUser.image || "user" }
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <h2 className="font-semibold">{currentUser?.firstName + " " + currentUser?.lastName }</h2>
            <p className="text-xs">online</p>
          </div>
        </div>

      </div>

      <div className="flex-1 overflow-y-auto p-4 w-full">
        {messages?.map((msg) => (
          <div
            key={msg._id}
            className={`flex ${
              msg.sender === user._id ? 'justify-end' : 'justify-start'
            } mb-4`}
          >
            <div
              className={`rounded-lg py-2 px-3 max-w-[70%] ${
                msg.sender === user._id
                  ? 'bg-[#FF6F61]/30 rounded-tr-none'
                  : 'bg-slate-50 rounded-tl-none'
              }`}
            >
              <p className="text-sm break-words">{msg.message}</p>
              <p className="text-[10px] text-gray-500 text-right mt-1">
                {formatTime(msg.timestamp)}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="bg-slate-100/60 p-2">
        <div className="flex items-center bg-white rounded-full">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message"
            className="flex-1 py-2 px-4 bg-transparent focus:outline-none"
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="p-2 bg-[#FF6F61]  rounded-full mr-1"
          >
            <Send size={20} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}

