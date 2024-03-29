import { Container } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import UserPage from "./pages/UserPage";
import PostPage from "./pages/PostPage";
import { Header } from "./components/Header";
import Homepage from "./pages/Homepage";
import Authpage from "./pages/Authpage";
function App() {
  return (
    <Container maxW="620px">
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/auth" element={<Authpage />} />
        <Route path="/:username" element={<UserPage />} />
        <Route path="/:username/post/:pid" element={<PostPage />} />
      </Routes>
    </Container>
  );
}

export default App;
