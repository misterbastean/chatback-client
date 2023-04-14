import { Row } from "react-bootstrap";
import Message from "./Message";

function ChatPane({ messages }) {
  return (
    <Row style={{ marginTop: "6rem", marginBottom: "5rem" }}>
      <div>
        {messages.map((message) => (
          <Message
            key={message._id}
            messageText={message.text}
            userName={message.userName}
            postedDate={message.postedDate}
            bgColor="light"
          />
        ))}
      </div>
    </Row>
  );
}

export default ChatPane;
