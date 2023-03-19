import { Button, Col, Form, Row } from "react-bootstrap";

function ChatInput({ handleNewMessageChange, handleKeyDown, newMessage }) {
  return (
    <Row
      className="py-3 border"
      style={{
        position: "fixed",
        bottom: "0%",
        width: "100%",
        backgroundColor: "white",
        zIndex: 100,
      }}
    >
      <Col xs={8} lg={10} xl={12}>
        <Form.Control
          type="text"
          placeholder="Type message..."
          value={newMessage}
          onChange={handleNewMessageChange}
          onKeyDown={handleKeyDown}
        />
      </Col>
      <Col>
        <Button variant="primary" style={{ width: "5rem" }}>
          Send
        </Button>
      </Col>
    </Row>
  );
}

export default ChatInput;
