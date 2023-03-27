import { Route, Switch } from "wouter";
import { Toaster } from "react-hot-toast";
import LandingPage from "./pages/LandingPage";
import RoomPage from "./pages/RoomPage";
import NewRoomPage from "./pages/NewRoomPage";
import JoinRoomPage from "./pages/JoinRoomPage";
import AboutPage from "./pages/AboutPage";

function App() {
  return (
    <>
      <Toaster />
      <Route path="/">
        <LandingPage />
      </Route>
      <Route path="/about">
        <AboutPage />
      </Route>
      <Switch>
        <Route path="/room/new">
          <NewRoomPage />
        </Route>
        <Route path="/room/:roomCode">
          <RoomPage />
        </Route>
        <Route path="/room/:roomCode/join">
          <JoinRoomPage />
        </Route>
      </Switch>
    </>
  );
}

export default App;
