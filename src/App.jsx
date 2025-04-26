import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RoomPage from "./pages/RoomPage";
import ChatPage from "./pages/ChatPage";
import Protected from "./components/Protected";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login olmadan girilebilen sayfalar */}
        <Route path="/" element={<LoginPage />} />
        {/* Login olduktan sonra girilebilen sayfalar */}
        <Route element={<Protected />}>
          <Route path="/room" element={<RoomPage />} />
          <Route path="/chat/:room" element={<ChatPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
