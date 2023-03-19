import { Card } from "react-bootstrap";

function Message({ messageText, userName, postedDate, bgColor }) {
  return (
    <Card className="mb-2" bg={bgColor}>
      <Card.Body>
        <Card.Text>{messageText}</Card.Text>
        <Card.Subtitle>{userName}</Card.Subtitle>
      </Card.Body>
    </Card>
  );
}

/*
  <p>{messageText}</p>
  <p>{userName}</p>
  <p>{postedDate}</p>
*/

export default Message;
