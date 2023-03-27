import Container from "react-bootstrap/Container";
import toast, { Toaster } from "react-hot-toast";
import NewRoomForm from "../components/NewRoomForm";

function NewRoomPage() {
  return (
    <Container className="mt-5">
      <NewRoomForm />
    </Container>
  );
}

export default NewRoomPage;
