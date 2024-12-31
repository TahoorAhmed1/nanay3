export default function UserList({ users, onSelectUser, selectedUser }) {
    return (
      <div className="w-1/3 border-r">
        <h2 className="text-xl font-semibold p-4 border-b">Users</h2>
        <div className="overflow-y-auto h-[calc(600px-60px)]">
          {users?.map((user,index) => {
            const userId = user?.user?._id; 
            const id = index + 1; 
            return (
              <button
                key={index}
                onClick={() => onSelectUser(id,userId)}
                className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
                  selectedUser == id ? 'bg-blue-100' : ''
                }`}
                aria-selected={selectedUser === id ? 'true' : 'false'} 
              >
                {user?.username}
              </button>
            );
          })}
        </div>
      </div>
    );
  }
  