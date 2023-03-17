import Message from "./Message";

function ChatPane({ messages }) {
  return (
    <div>
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
    </div>
  );
}

export default ChatPane;
