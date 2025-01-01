import { useEffect, useState } from "react";
import UserList from "./userList";
import ChatRoom from "./chatRoom";
import axios from "axios";
import { io } from "socket.io-client";
import { Get } from "../../config/api-method";
import { useSelector } from "react-redux";

const socket = io("http://localhost:5000");

export default function Chat() {
  const user = useSelector((state) => state.user);
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [messageUser, setMessageUser] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const getAllDataForNanny = () => {

  
    // // Only proceed if id is valid
    // if (!id.parentId && !id.nannyId) {
    //   console.error("User ID is not valid.");
    //   return;
    // }
  
    Get(`/booking`, null, { nannyId: user?._id })
      .then((res) => {
        console.log("res?", res?.data);
        if (res?.data) {
          const bookingPromises = res.data.map((item, index) => {
            // let id = user?.role === "user" ? : item?.parentId;
  
            // Skip if id is missing
            if (!item?.nannyId) return;
  
            return Get(`/auth/${item.parentId}`).then((res) => {
              const user = res?.data || {};
              
              // Safeguard against missing user data
              const username = user.firstName && user.lastName
                ? `${user.firstName} ${user.lastName}`
                : "Unknown User";
              const email = user.email || "No email available";
              const region = user.region || "No region available";
  
              return {
                id: item._id,
                Sno: index + 1,
                createdAt: item.createdAt,
                location: item.location,
                childrenCount: item.childrenCount,
                childrenAges: item.childrenAges?.join(", ") || "No ages available",
                schedule: item.schedule,
                username,
                email,
                region,
                rawStatus: item.status,
                user,
              };
            });
          });
  
          // Filter out any undefined promises (in case of missing id)
          const validPromises = bookingPromises.filter(Boolean);
  
          Promise.all(validPromises)
            .then((users) => {
              let user = users.filter(({ rawStatus }) => rawStatus === "approved");

              let uniqueUsers = [...new Map(user.map((item) => [item?.user?._id, item])).values()];
              
              
              setUsers(uniqueUsers);
            })
            .catch((err) =>
              console.error("Error resolving booking details:", err)
            );
        }
      })
      .catch((err) => console.error("Error fetching data:", err));
  };

  const getAllDataForFamily = () => {
  
    Get(`/booking`, null, { parentId: user?._id })
      .then((res) => {
        console.log("res?", res?.data);
        if (res?.data) {
          const bookingPromises = res.data.map((item, index) => {
       
  
            if (!item?.nannyId) return;
  
            return Get(`/auth/${item.nannyId}`).then((res) => {
              const user = res?.data || {};
              
              // Safeguard against missing user data
              const username = user.firstName && user.lastName
                ? `${user.firstName} ${user.lastName}`
                : "Unknown User";
              const email = user.email || "No email available";
              const region = user.region || "No region available";
  
              return {
                id: item._id,
                Sno: index + 1,
                createdAt: item.createdAt,
                location: item.location,
                childrenCount: item.childrenCount,
                childrenAges: item.childrenAges?.join(", ") || "No ages available",
                schedule: item.schedule,
                username,
                email,
                region,
                rawStatus: item.status,
                user,
              };
            });
          });
  
          // Filter out any undefined promises (in case of missing id)
          const validPromises = bookingPromises.filter(Boolean);
  
          Promise.all(validPromises)
            .then((users) => {
              let user = users.filter(({ rawStatus }) => rawStatus === "approved");

              let uniqueUsers = [...new Map(user.map((item) => [item?.user?._id, item])).values()];
              
              
              setUsers(uniqueUsers);
            })
            .catch((err) =>
              console.error("Error resolving booking details:", err)
            );
        }
      })
      .catch((err) => console.error("Error fetching data:", err));
  };
  

  useEffect(() => {
    if(user && user.role == "user"){
      getAllDataForFamily()
    }else if(user && user.role == "nanny"){
      getAllDataForNanny() 

    }
  }, []);

  useEffect(() => {
    if (currentChat) {
      console.log('Joining chat room:', currentChat._id);
  
      socket.emit('joinChat', currentChat._id, user._id);
  
      socket.on('newMessage', (message) => {
        console.log('Received new message:', message);
        let newMessage={
          sender: message?.sender?._id,
      message: message?.message,
      _id: message?._id,
      timestamp:message?.timestamp
        }
        setMessages((prev) => [...prev, newMessage]);
      });
  
      return () => {
        socket.off('newMessage');
      };
    }
  }, [currentChat, currentUser]);
  
  
  const startChat = async (id, participantId) => {
    const { data: chat } = await axios.post('http://localhost:5000/chat/create', {
      participants: [user?._id, participantId],
    });
    setCurrentChat(chat);
    setSelectedUser(id);
   
    setMessages(chat?.messages); 
  };
  

  const sendMessage = () => {
    if (newMessage.trim()) {
      socket.emit('sendMessage', {
        chatId: currentChat._id,
        senderId: user._id,
        message: newMessage,
      });
      setNewMessage('');
    }
  };
  

  return (
    <main className="flex min-h-[80vh]  items-center justify-center bg-white container md:px-6 px-3 md:py-20 py-10">
      <div className="w-full h-full border  rounded-lg shadow-md overflow-hidden">
        <div className="flex">
          <UserList
            users={users}
            onSelectUser={startChat}
            selectedUser={selectedUser}
            setCurrentUser={setCurrentUser}
            
          />
          {selectedUser ? (
            <ChatRoom
            user={user}
              currentUser={currentUser}
              selectedUser={selectedUser}
              messages={messages}
              newMessage={newMessage}
              setNewMessage={setNewMessage}
              sendMessage={sendMessage}
            />
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              Select a user to start chatting
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
