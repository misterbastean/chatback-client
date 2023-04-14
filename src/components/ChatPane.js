import { Row } from "react-bootstrap";
import Message from "./Message";

function ChatPane({ messages }) {
  return (
    <Row style={{ marginTop: "6rem", marginBottom: "5rem" }}>
      <div>
        {messages.map((message) => {
          let parsedUsername = message.userName;
          if (message.userRole === "moderator")
            parsedUsername = `${message.userName} (Moderator)`;
          // TODO: Add check for username is current user, append "(You)"
          return (
            <Message
              key={message._id}
              messageText={message.text}
              userName={parsedUsername}
              postedDate={message.postedDate}
              bgColor="light"
            />
          );
        })}
      </div>
    </Row>
  );
}

export default ChatPane;
