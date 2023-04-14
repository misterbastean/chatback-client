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
      <Col xs={10} lg={10} xl={11}>
        <Form.Control
          type="text"
          placeholder="Type message..."
          value={newMessage}
          onChange={handleNewMessageChange}
          onKeyDown={handleKeyDown}
        />
      </Col>

      <Col xs={2} lg={2} xl={1}>
        <div className="d-grid gap-2">
          <Button variant="primary">Send</Button>
        </div>
      </Col>
    </Row>
  );
}

export default ChatInput;
