function Message({ messageText, userName, postedDate }) {
  return (
    <div>
      <p>{messageText}</p>
      <p>{userName}</p>
      <p>{postedDate}</p>
    </div>
  );
}

export default Message;
