import { useState, useRef, useEffect } from "react";
import { useRoute } from "wouter";
import { Container } from "react-bootstrap";
import ChatPane from "../components/ChatPane";
import ChatHeader from "../components/ChatHeader";
import ChatInput from "../components/ChatInput";
import useChat from "../hooks/useChat";

function RoomPage() {
  const [, params] = useRoute("/room/:roomCode");
  // Create WS and manages messaging
  const { messages, sendMessage } = useChat(params.roomCode);
  const [newMessage, setNewMessage] = useState("");

  const messagesEndRef = useRef(null);
  useEffect(() => {
    if (messages) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    sendMessage(newMessage);
    setNewMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleSendMessage();
    }
  };

  return (
    <Container fluid>
      <ChatHeader roomCode={params.roomCode} />
      <ChatPane messages={messages} />
      <div ref={messagesEndRef}></div>
      <ChatInput
        handleNewMessageChange={handleNewMessageChange}
        handleKeyDown={handleKeyDown}
        newMessage={newMessage}
      />
    </Container>
  );
}

export default RoomPage;
