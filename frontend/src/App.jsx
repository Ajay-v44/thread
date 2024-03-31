import { Container } from "@chakra-ui/react";
import { Navigate, Route, Routes } from "react-router-dom";
import UserPage from "./pages/UserPage";
import PostPage from "./pages/PostPage";
import { Header } from "./components/Header";
import Homepage from "./pages/Homepage";
import Authpage from "./pages/Authpage";
import { useRecoilValue } from "recoil";
import userAtom from "./atoms/UserAtom";
import LogoutButton from "./components/LogoutButton";
import UpdateProfile from "./pages/UpdateProfile";
import CreatePost from "./components/CreatePost";
function App() {
  const user = useRecoilValue(userAtom);
  return (
    <Container maxW="620px">
      <Header />
      {user && <LogoutButton />}
      <Routes>
        <Route
          path="/"
          element={user ? <Homepage /> : <Navigate to="/auth" />}
        />
        <Route
          path="/auth"
          element={!user ? <Authpage /> : <Navigate to="/" />}
        />
        <Route
          path="/update"
          element={user ? <UpdateProfile /> : <Navigate to="/auth" />}
        />
        <Route path="/:username" element={<UserPage />} />
        <Route path="/:username/post/:pid" element={<PostPage />} />
      </Routes>
      {user && <CreatePost />}

    </Container>
  );
}

export default App;
