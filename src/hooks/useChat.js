import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import { useLocation } from "wouter";
import toast from "react-hot-toast";

const NEW_MESSAGE_EVENT = "newChatMessage";
const ERROR_EVENT = "error";
const SOCKET_SERVER_URL = "http://localhost:3001";

const useChat = (roomCode) => {
  const [messages, setMessages] = useState([]);
  const socketRef = useRef();
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Create WS connection
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { roomCode, userId: localStorage.getItem("userId") },
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

    // Listen for errors
    socketRef.current.on(ERROR_EVENT, (errorBody) => {
      console.log("errorBody:", JSON.parse(errorBody));
      const response = JSON.parse(errorBody);
      // Handle room not found
      if (response.code === 404) {
        toast.error("That room doesn't exist. Please try again.");
        setLocation("/");
        // Fallback
      } else {
        toast.error(response.message);
        setLocation("/");
      }
    });

    // When connection is closed, destroy the socket ref
    return () => {
      socketRef.current.disconnect();
    };
  }, [roomCode, setLocation]);

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
