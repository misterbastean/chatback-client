import Container from "react-bootstrap/Container";
import Message from "./Message";

function ChatPane({ messages }) {
  return (
    <Container style={{ marginBottom: "5em" }}>
      <p>Chat Pane</p>
      <div>
        {messages.map((message) => (
          <Message
            key={message._id}
            messageText={message.text}
            userName={message.userName}
            postedDate={message.postedDate}
          />
        ))}
      </div>
    </Container>
  );
}

export default ChatPane;
