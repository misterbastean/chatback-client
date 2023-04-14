import { Row } from "react-bootstrap";
function ChatHeader({ roomCode }) {
  return (
    <Row
      style={{
        position: "fixed",
        top: "0%",
        width: "100%",
        zIndex: 100,
      }}
    >
      <h1 className="text-center py-3 text-white bg-info border-bottom">
        {roomCode}
      </h1>
    </Row>
  );
}

export default ChatHeader;
