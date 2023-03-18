import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

const NEW_MESSAGE_EVENT = "newChatMessage";
const SOCKET_SERVER_URL = "http://localhost:3001";

const demoMessages = [
  {
    _id: "1",
    text: "Bacon ipsum dolor amet bresaola pancetta hamburger, tenderloin beef rump landjaeger pork belly corned beef pig",
    userName: "Josh",
    postedDate: Date.now(),
  },
  {
    _id: "2",
    text: "Pancetta pork chop alcatra, shank jowl chicken pork belly sausage. Sirloin ground round ham shank, capicola cupim cow alcatra short loin doner frankfurter.",
    userName: "Kim",
    postedDate: Date.now(),
  },
  {
    _id: "3",
    text: "Brisket meatloaf chislic kielbasa, cupim hamburger pig drumstick buffalo fatback pork chop tail.",
    userName: "Zoe",
    postedDate: Date.now(),
  },
  {
    _id: "4",
    text: "lulz",
    userName: "Jacob",
    postedDate: Date.now(),
  },
  {
    _id: "5",
    text: "Bacon ipsum dolor amet bresaola pancetta hamburger, tenderloin beef rump landjaeger pork belly corned beef pig",
    userName: "Maggie",
    postedDate: Date.now(),
  },
];

const useChat = (roomCode) => {
  const [messages, setMessages] = useState([...demoMessages]);
  const socketRef = useRef();

  useEffect(() => {
    // Create WS connection
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { roomCode },
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
    socketRef.current.emit(NEW_MESSAGE_EVENT, {
      _id: Date.now(),
      text,
      userName: socketRef.current.id,
      postedDate: Date.now(),
    });
  };

  return { messages, sendMessage };
};

export default useChat;
