import { useState } from "react";
import { useLocation, useRoute } from "wouter";
import { Container, Form, Button } from "react-bootstrap";

function NewRoomPage() {
  const savedUserName = localStorage.getItem("userName");
  const [userName, setUserName] = useState(savedUserName || "");
  const [, params] = useRoute("/room/:roomCode/join");
  const [, setLocation] = useLocation();

  // TODO: Set userName valute from localstorage on page load, if exists

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userName,
        roomCode: params.roomCode,
      }),
    };

    fetch(
      `http://${window.location.hostname}:3001/api/v1/rooms/${params.roomCode}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((response) => {
        if (!response.success) {
          // TODO: Handle error
          console.log("Error joining room:", response.message);
        } else {
          // Store user info in localStorage
          localStorage.setItem("userName", userName);
          localStorage.setItem(
            "userId",
            response.room.members.find((member) => member.userName === userName)
              ._id
          ); // TODO: update to cookie for security

          // Redirect to room page
          setLocation(`/room/${response.room.roomCode}`);
        }
      })
      .catch((err) => {
        // TODO: Handle error
        console.log("Error joining room:", err);
      });
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
        <Button size="lg" variant="success" type="submit">
          Join
        </Button>
      </Form>
    </Container>
  );
}

export default NewRoomPage;
