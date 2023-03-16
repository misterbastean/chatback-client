import { useRef } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";

const ROOM_CODE_LENGTH = 4;

function RoomCodeForm() {
  const roomCode = "";
  const roomCodeInputsRefs = useRef([null, null, null, null]);
  console.log("roomcodeInputsRefs:", roomCodeInputsRefs);

  console.log("roomCode:", roomCode);

  const handleInputChange = (e, index) => {
    const allInputsFull = roomCodeInputsRefs.current.every((item) => {
      return item.value.trim().length > 0;
    });
    if (e.currentTarget.value.trim().length > 0) {
      // Advance to next input if not on last one.
      if (index <= ROOM_CODE_LENGTH - 2) {
        roomCodeInputsRefs.current[index + 1].focus();
      }

      if (allInputsFull) {
        console.log("All inputs full, requesting room.");
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.currentTarget.value === "") {
      roomCodeInputsRefs.current[index - 1].focus();
    }
  };

  return (
    <>
      <p className="text-center fs-6 mb-4">
        Already have a room code? Enter it here.
      </p>
      <Form>
        <Container style={{ maxWidth: "80%" }}>
          <Row className="px-6">
            {roomCodeInputsRefs.current.map((_ref, index) => {
              console.log(index);
              return (
                <Col className="mx-0 px-1" key={`roomCode=${index}`}>
                  <Form.Control
                    className="fs-1 text-center"
                    type="text"
                    name="roomCode"
                    minLength="1"
                    maxLength="1"
                    required
                    autoFocus={index === 0}
                    autoComplete="off"
                    ref={(el) => (roomCodeInputsRefs.current[index] = el)}
                    onChange={(e) => handleInputChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                  />
                </Col>
              );
            })}
          </Row>
        </Container>
      </Form>
    </>
  );
}

export default RoomCodeForm;
