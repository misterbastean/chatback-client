import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function NewRoomForm() {
  const [userName, setUserName] = useState("");
  const [roomName, setRoomName] = useState("");
  const [roomDays, setRoomDays] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Generate and store UUID
    const userId = uuidv4();
    localStorage.setItem("userId", userId); // TODO: update to cookie for security

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userName,
        userId,
        roomName,
        roomDays,
      }),
    };
    fetch(
      `http://${window.location.hostname}:3001/api/v1/rooms`,
      requestOptions
    )
      .then((response) => response.json())
      .then((response) => console.log(response));
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
