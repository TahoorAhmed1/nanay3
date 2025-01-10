import { useEffect, useState } from "react";
import UserList from "./userList";
import ChatRoom from "./chatRoom";
import axios from "axios";
import { io } from "socket.io-client";
import { Get } from "../../config/api-method";
import { useSelector } from "react-redux";

const socket = io('https://nany-backend.vercel.app');

export default function Chat() {
  const user = useSelector((state) => state.user);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loadingUser, setLoadingUsers] = useState(false);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [showChat, setShowChat] = useState(false); // New state for responsiveness

  const getAllDataForNanny = () => {
    setLoadingUsers(true);
    Get(`/booking`, null, { nannyId: user?._id })
      .then((res) => {
        console.log("res?", res?.data);
        if (res?.data) {
          const bookingPromises = res.data.map((item, index) => {
            if (!item?.nannyId) return;

            return Get(`/auth/${item.parentId}`).then((res) => {
              const user = res?.data || {};

              const username =
                user.firstName && user.lastName
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
                childrenAges:
                  item.childrenAges?.join(", ") || "No ages available",
                schedule: item.schedule,
                username,
                email,
                region,
                rawStatus: item.status,
                user,
              };
            });
          });
          const validPromises = bookingPromises.filter(Boolean);
          Promise.all(validPromises)
            .then((users) => {
              let user = users.filter(
                ({ rawStatus }) => rawStatus === "approved"
              );

              let uniqueUsers = [
                ...new Map(
                  user.map((item) => [item?.user?._id, item])
                ).values(),
              ];

              setUsers(uniqueUsers);
              setLoadingUsers(false);
            })
            .catch((err) => setLoadingUsers(false));
        }
      })
      .catch((err) => setLoadingUsers(false));
  };

  const getAllDataForFamily = () => {
    setLoadingUsers(true);
    Get(`/booking`, null, { parentId: user?._id })
      .then((res) => {
        console.log("res?", res?.data);
        if (res?.data) {
          const bookingPromises = res.data.map((item, index) => {
            if (!item?.nannyId) return;

            return Get(`/auth/${item.nannyId}`).then((res) => {
              const user = res?.data || {};

              const username =
                user.firstName && user.lastName
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
                childrenAges:
                  item.childrenAges?.join(", ") || "No ages available",
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
              let user = users.filter(
                ({ rawStatus }) => rawStatus === "approved"
              );

              let uniqueUsers = [
                ...new Map(
                  user.map((item) => [item?.user?._id, item])
                ).values(),
              ];

              setUsers(uniqueUsers);
              setLoadingUsers(false);
            })
            .catch((err) => setLoadingUsers(false));
        }
      })
      .catch((err) => setLoadingUsers(false));
  };

  useEffect(() => {
    if (user && user.role == "user") {
      getAllDataForFamily();
    } else if (user && user.role == "nanny") {
      getAllDataForNanny();
    }
  }, []);

  useEffect(() => {
    if (currentChat) {
      console.log("Joining chat room:", currentChat._id);

      socket.emit("joinChat", currentChat._id, user._id);

      socket.on("newMessage", (message) => {
        console.log("Received new message:", message);
        let newMessage = {
          sender: message?.sender?._id,
          message: message?.message,
          _id: message?._id,
          timestamp: message?.timestamp,
        };
        setMessages((prev) => [...prev, newMessage]);
      });

      return () => {
        socket.off("newMessage");
      };
    }
  }, [currentChat, currentUser]);

  const startChat = async (id, participantId) => {
    const { data: chat } = await axios.post(
      "https://nany-backend.vercel.app/chat/create",
      {
        participants: [user?._id, participantId],
      }
    );
    setCurrentChat(chat);
    setSelectedUser(id);

    setMessages(chat?.messages);
    setShowChat(true);
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      socket.emit("sendMessage", {
        chatId: currentChat._id,
        senderId: user._id,
        message: newMessage,
      });
      setNewMessage("");
    }
  };

  return (
    <main className="flex min-h-[80vh]  items-center justify-center bg-white mx-auto px-4 lg:px-6 md:py-20 py-10">
      <div className="w-full h-full border border-slate-100/60 rounded-lg shadow-md overflow-hidden">
        <div className="flex w-full">
          <UserList
            users={users}
            onSelectUser={startChat}
            selectedUser={selectedUser}
            setCurrentUser={setCurrentUser}
            showChat={showChat}
            loadingUser={loadingUser}
          />

          {selectedUser ? (
            <div
              className={` md:block  w-full ${showChat ? "block" : "hidden"}`}
            >
              <ChatRoom
                user={user}
                currentUser={currentUser}
                selectedUser={selectedUser}
                messages={messages}
                newMessage={newMessage}
                setNewMessage={setNewMessage}
                sendMessage={sendMessage}
                goBack={() => setShowChat(false)}
              />
            </div>
          ) : (
            <div className="flex-1  md:flex hidden  flex-col items-center justify-center text-gray-500 bg-gray-50/40  p-6 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-[#FF6F61] mb-4 animate-bounce"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16h6M4 6h16M4 6a2 2 0 012-2h12a2 2 0 012 2M4 6v12a2 2 0 002 2h12a2 2 0 002-2V6"
                />
              </svg>
              <p className="text-lg font-semibold text-gray-700">
                Select a user to start chatting
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Click on a user from the list to view your conversations.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
