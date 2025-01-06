import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { userLogo } from '../../assets';

export default function UserList({ users, onSelectUser, selectedUser, setCurrentUser,showChat,loadingUser }) {

  const [searchTerm, setSearchTerm] = useState(''); 
  const filteredUsers = users?.filter((data) =>
    `${data?.user?.firstName} ${data?.user?.lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`w-full md:w-[50%] lg:w-[30%] bg-white border-r border-slate-100/60 flex flex-col h-screen  md:block ${showChat ? "hidden" : "block"} `}>
    
      <div className="px-3 py-2">
        <div className="relative">
        <input
            type="text"
            placeholder="Search or start new chat"
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            className="w-full bg-slate-100/50 py-2 pl-10 pr-4 rounded-lg focus:outline-none"
          />
          <Search className="absolute left-3 top-2.5 text-[#54656f]" size={20} />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {loadingUser ? Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="w-full px-3 py-3 flex items-center border-b border-slate-100/60 animate-pulse"
          >
            <div className="w-12 h-12 rounded-full bg-slate-200 mr-3"></div>
            <div className="flex-1">
              <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-slate-200 rounded w-1/2"></div>
            </div>
          </div>
        )):
        
        filteredUsers?.map((data, index) => {
          const userId = data?.user?._id;
          const id = index + 1;
          return (
            <button
              key={index}
              onClick={() =>{setCurrentUser(data?.user) 
                onSelectUser(id, userId)}}
              className={`w-full text-left px-3 py-3 flex items-center border-b  border-slate-100/60 hover:bg-slate-100/50 ${
                selectedUser === id ? 'bg-slate-100/50' : ''
              }`}
              aria-selected={selectedUser === id ? 'true' : 'false'}
            >
              <img
                src={data?.user?.image || userLogo}
                alt={data?.datauser?.firstName}
                className="w-12 h-12 rounded-full mr-3"
              />
              <div className="flex-1  ">
                <h3 className="font-semibold text-[#111b21]">{data?.user?.firstName + " " + data?.user?.lastName }</h3>
              </div>
            </button>
          );
        })
        
        }
      </div>
    </div>
  );
}

