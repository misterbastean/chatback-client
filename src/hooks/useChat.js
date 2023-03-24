import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

const NEW_MESSAGE_EVENT = "newChatMessage";
const SOCKET_SERVER_URL = "http://localhost:3001";

const useChat = (roomCode) => {
  const [messages, setMessages] = useState([]);
  const socketRef = useRef();

  useEffect(() => {
    // Create WS connection
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { roomCode },
    });

    // Load previous messages when joining the room
    socketRef.current.emit("loadMessages");

    // Listen for previous messages
    socketRef.current.on("previousMessages", (data) => {
      setMessages(data);
    });

    // Listen for incoming messages
    socketRef.current.on(NEW_MESSAGE_EVENT, (message) => {
      const incomingMessage = {
        ...message,
        ownedByCurrentUser: message.userName === socketRef.current.id,
      };
      setMessages((messages) => [...messages, incomingMessage]);
    });

    // When connection is closed, destroy the socket ref
    return () => {
      socketRef.current.disconnect();
    };
  }, [roomCode]);

  // Sends message to server, to be forwarded to all users in the same room
  const sendMessage = (text) => {
    const userId = localStorage.getItem("userId");
    if (!userId) throw new Error("Missing userId, please rejoin the room.");

    socketRef.current.emit(NEW_MESSAGE_EVENT, {
      text,
      userId,
      postedDate: Date.now(),
    });
  };

  return { messages, sendMessage };
};

export default useChat;
