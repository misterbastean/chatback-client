import { Route, Switch } from "wouter";
import LandingPage from "./pages/LandingPage";
import RoomPage from "./pages/RoomPage";
import NewRoomPage from "./pages/NewRoomPage";
import AboutPage from "./pages/AboutPage";

function App() {
  return (
    <>
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
        <Route path="/room/:id">
          <RoomPage />
        </Route>
      </Switch>
    </>
  );
}

export default App;
