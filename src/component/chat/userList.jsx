import React from 'react';
import { Search } from 'lucide-react';

export default function UserList({ users, onSelectUser, selectedUser, setCurrentUser }) {
  return (
    <div className="w-full md:w-1/3 lg:w-[30%] bg-white border-r flex flex-col h-screen">
    
      <div className="px-3 py-2">
        <div className="relative">
          <input
            type="text"
            placeholder="Search or start new chat"
            className="w-full bg-[#f0f2f5] py-2 pl-10 pr-4 rounded-lg focus:outline-none"
          />
          <Search className="absolute left-3 top-2.5 text-[#54656f]" size={20} />
        </div>
      </div>

      {/* User List */}
      <div className="flex-1 overflow-y-auto">
        {users?.map((data, index) => {
          const userId = data?.user?._id;
          const id = index + 1;
          return (
            <button
              key={index}
              onClick={() =>{setCurrentUser(data?.user) 
                onSelectUser(id, userId)}}
              className={`w-full text-left px-3 py-3 flex items-center hover:bg-[#f0f2f5] ${
                selectedUser === id ? 'bg-[#f0f2f5]' : ''
              }`}
              aria-selected={selectedUser === id ? 'true' : 'false'}
            >
              <img
                src={data?.user?.image}
                alt={data?.datauser?.firstName}
                className="w-12 h-12 rounded-full mr-3"
              />
              <div className="flex-1 border-b pb-3">
                <h3 className="font-semibold text-[#111b21]">{data?.user?.firstName + " " + data?.user?.lastName }</h3>
                <p className="text-sm text-[#667781] truncate">Last message here...</p>
              </div>
              <span className="text-xs text-[#667781]">12:00 PM</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

