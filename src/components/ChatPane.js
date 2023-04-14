import { Row } from "react-bootstrap";
import Message from "./Message";

function ChatPane({ messages }) {
  const currentUserId = localStorage.getItem("userId");
  return (
    <Row style={{ marginTop: "6rem", marginBottom: "5rem" }}>
      <div>
        {messages.map((message) => {
          let parsedUsername = message.userName;
          if (message.userId == currentUserId) {
            parsedUsername = `${message.userName} (You)`;
          } else if (message.userRole === "moderator") {
            parsedUsername = `${message.userName} (Moderator)`;
          }

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
