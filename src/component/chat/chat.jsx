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
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const getAllData = () => {
    let id =
      user?.role === "user"
        ? { parentId: user?._id }
        : { nannyId: user?._id };
  
    // // Only proceed if id is valid
    // if (!id.parentId && !id.nannyId) {
    //   console.error("User ID is not valid.");
    //   return;
    // }
  
    Get(`/booking`, null, id)
      .then((res) => {
        console.log("res?", res?.data);
        if (res?.data) {
          const bookingPromises = res.data.map((item, index) => {
            // let id = user?.role === "user" ? : item?.parentId;
  
            // Skip if id is missing
            // if (!id) return;
  
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
              setUsers(users);
            })
            .catch((err) =>
              console.error("Error resolving booking details:", err)
            );
        }
      })
      .catch((err) => console.error("Error fetching data:", err));
  };
  

  useEffect(() => {
    getAllData();
  }, []);

  useEffect(() => {
    if (currentChat) {
        console.log('currentUser', currentChat,currentUser)
      socket.emit('joinChat', currentChat._id, currentUser._id);
      socket.on('newMessage', (message) => {
        setMessages((prev) => [...prev, message]);
      });
    }

    return () => {
      socket.off('newMessage');
    };
  }, [currentChat, currentUser]);

  const startChat = async (id,participantId) => {
    const { data: chat } = await axios.post(
      "http://localhost:5000/chat/create",
      {
        participants: [user?._id, participantId],
      }
    );

    setCurrentChat(chat);
    setSelectedUser(id);
    setCurrentUser(user); 
    setMessages(chat.messages);
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      socket.emit("sendMessage", {
        chatId: currentChat._id,
        senderId: currentUser._id,
        message: newMessage,
      });
      setNewMessage("");
    }
  };

  console.log("user", users);

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 container md:px-6 px-3 py-20">
      <div className="w-full h-full bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex">
          <UserList
            users={users}
            onSelectUser={startChat}
            selectedUser={selectedUser}
          />
          {selectedUser ? (
            <ChatRoom
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
