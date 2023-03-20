import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useLocation, useRoute } from "wouter";
import { Container, Form } from "react-bootstrap";

function NewRoomPage() {
  const [userName, setUserName] = useState("");
  const [, params] = useRoute("/room/:roomCode/join");
  const [, navigate] = useLocation();

  // TODO: Set userName valute from localstorage on page load, if exists

  const handleSubmit = (e) => {
    e.preventDefault();
    // Verify username exists and has length
    if (!userName || userName.length === 0) {
      console.error("Enter a username.");
      return;
    }
    if (userName.length > 20) {
      console.error("Username too long (20 characters max).");
      return;
    }

    // Set name and UUID in localstorage
    const userId = uuidv4();
    localStorage.setItem("userId", userId);
    localStorage.setItem("userName", userName);

    // Redirect to room
    navigate(`/room/${params.roomCode}`);
  };

  return (
    <Container className="mt-5">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Your Name</Form.Label>
          <Form.Control
            type="text"
            name="userName"
            placeholder="Enter Name"
            autoFocus
            required
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
        </Form.Group>
      </Form>
    </Container>
  );
}

export default NewRoomPage;
