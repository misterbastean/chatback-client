import { useState } from "react";
import { useRoute } from "wouter";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ChatPane from "../components/ChatPane";

const demoMessages = [
  {
    _id: "1",
    text: "Bacon ipsum dolor amet bresaola pancetta hamburger, tenderloin beef rump landjaeger pork belly corned beef pig",
    userName: "Josh",
    postedDate: Date.now(),
  },
  {
    _id: "2",
    text: "Pancetta pork chop alcatra, shank jowl chicken pork belly sausage. Sirloin ground round ham shank, capicola cupim cow alcatra short loin doner frankfurter.",
    userName: "Kim",
    postedDate: Date.now(),
  },
  {
    _id: "3",
    text: "Brisket meatloaf chislic kielbasa, cupim hamburger pig drumstick buffalo fatback pork chop tail.",
    userName: "Zoe",
    postedDate: Date.now(),
  },
  {
    _id: "4",
    text: "lulz",
    userName: "Jacob",
    postedDate: Date.now(),
  },
  {
    _id: "5",
    text: "Bacon ipsum dolor amet bresaola pancetta hamburger, tenderloin beef rump landjaeger pork belly corned beef pig",
    userName: "Maggie",
    postedDate: Date.now(),
  },
];

function RoomPage() {
  const [messages, setMessages] = useState([...demoMessages]);
  const [, params] = useRoute("/room/:roomCode");
  console.log("params:", params);

  return (
    <Container className="mt-2">
      <Row className="mb-5">
        <Col>
          <h1 className="text-center mt-2">{params.roomCode}</h1>
        </Col>
      </Row>
      <ChatPane messages={messages} />
      <Form className="mb-3 mx-3 fixed-bottom">
        <Row>
          <Col xs={9}>
            <Form.Group>
              <Form.Control type="text" placeholder="Type message..." />
            </Form.Group>
          </Col>
          <Col xs={3} className="d-grid gap-2">
            <Button variant="primary" type="submit">
              Send
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default RoomPage;
