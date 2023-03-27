import Container from "react-bootstrap/Container";
import toast, { Toaster } from "react-hot-toast";
import NewRoomForm from "../components/NewRoomForm";

const handleError = (errorMessage) => {
  console.log("handleError fired");
  toast.error(errorMessage);
};

function NewRoomPage() {
  return (
    <Container className="mt-5">
      <Toaster />
      <NewRoomForm handleError={handleError} />
    </Container>
  );
}

export default NewRoomPage;
