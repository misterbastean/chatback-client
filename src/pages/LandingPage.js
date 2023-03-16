import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Link } from "wouter";
import RoomCodeForm from "../components/RoomCodeForm";

function LandingPage() {
  return (
    <Container>
      <Row className="mb-4">
        <h1 className="text-center my-4 display-1">ChatBack</h1>
      </Row>
      <Row className="mb-5">
        <p className="text-center fs-4">ChatBack gives everyone a voice.</p>
      </Row>
      <Row className="mb-5"></Row>
      <RoomCodeForm />
      <Row className="my-5">
        <Col xs={1} />
        <Col xs={4}>
          <hr className="" />
        </Col>
        <Col xs={2} className="text-center">
          <p>or</p>
        </Col>
        <Col xs={4}>
          <hr className="divider flex-grow" />
        </Col>
        <Col xs={1} />
      </Row>
      <Row className="justify-content-center">
        <Col xs="auto">
          <Link href="/room/new">
            <Button variant="success" size="lg">
              Create New Room
            </Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
}

export default LandingPage;
