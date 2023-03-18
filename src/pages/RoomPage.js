import { useState } from "react";
import { useRoute } from "wouter";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ChatPane from "../components/ChatPane";
import useChat from "../hooks/useChat";

function RoomPage() {
  const [, params] = useRoute("/room/:roomCode");
  // Create WS and manages messaging
  const { messages, sendMessage } = useChat(params.roomCode);
  const [newMessage, setNewMessage] = useState("");

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    sendMessage(newMessage);
    setNewMessage("");
  };

  // const handleFormSubmit = (e) => {
  //   e.preventDefault();
  //   const formData = new FormData(e.target);
  //   const text = formData.get("message");
  //   const message = {
  //     _id: Date.now(),
  //     text,
  //     userName: "Josh",
  //     postedDate: Date.now(),
  //   };
  //   console.log("message:", message);
  //   setMessages([...messages, message]);
  //   e.target.reset();
  // };

  return (
    <Container className="mt-2">
      <Row>
        <Col>
          <h1 className="text-center mt-2">{params.roomCode}</h1>
        </Col>
      </Row>
      <ChatPane messages={messages} />
      <div className="mb-3 mx-3 fixed-bottom">
        <Row>
          <Col xs={9}>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Type message..."
                value={newMessage}
                onChange={handleNewMessageChange}
              />
            </Form.Group>
          </Col>
          <Col xs={3} className="d-grid gap-2">
            <Button variant="primary" onClick={handleSendMessage}>
              Send
            </Button>
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default RoomPage;
