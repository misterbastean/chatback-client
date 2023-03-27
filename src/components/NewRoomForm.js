import { useState } from "react";
import { useLocation } from "wouter";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import toast from "react-hot-toast";

function NewRoomForm() {
  const [userName, setUserName] = useState("");
  const [roomName, setRoomName] = useState("");
  const [roomDays, setRoomDays] = useState(1);
  const [, setLocation] = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userName,
        roomName: roomName || "Unnamed ChatBack",
        roomDays,
      }),
    };

    fetch(
      `http://${window.location.hostname}:3001/api/v1/rooms`,
      requestOptions
    )
      .then((response) => response.json())
      .then((response) => {
        if (!response.success) {
          console.log("Error creating room:", response.message);
          toast.error(response.message);
        } else {
          // Store userId in localStorage
          localStorage.setItem("userId", response.room.members[0]._id); // TODO: update to cookie for security

          // Redirect to room page
          setLocation(`/room/${response.room.roomCode}`);
        }
      })
      .catch((err) => {
        console.log("Error creating room:", err.message);
        toast.error(err.message);
      });
  };

  return (
    <Form className="mx-5" onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Your Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Name"
          required
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Room Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Room Name"
          value={roomName}
          onChange={(e) => {
            setRoomName(e.target.value);
          }}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>How many days should the room remain open?</Form.Label>
        <Form.Control
          type="number"
          min={1}
          max={10}
          value={roomDays}
          onChange={(e) => {
            if (e.target.value <= 10) {
              setRoomDays(e.target.value);
            }
          }}
        />
        <Form.Text className="text-muted">Max of 10 days</Form.Text>
      </Form.Group>
      <div className="d-grid mt-4">
        <Button size="lg" variant="success" type="submit">
          Create
        </Button>
      </div>
    </Form>
  );
}

export default NewRoomForm;
