import { Routes, Route, Navigate } from "react-router-dom";
import SplashScreen from "./screens/SplashScreen";
import TokenCheckScreen from "./screens/TokenCheckScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import GlobalChatScreen from "./screens/GlobalChatScreen";
import MiniThreadScreen from "./screens/MiniThreadScreen";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<SplashScreen />} />
      <Route path="/token-check" element={<TokenCheckScreen />} />
      <Route
        path="/login"
        element={<LoginScreen />}
      />
      <Route
        path="/register"
        element={<RegisterScreen />}
      />
      <Route
        path="/chat"
        element={
          <ProtectedRoute>
            <GlobalChatScreen />
          </ProtectedRoute>
        }
      />
      <Route
        path="/thread"
        element={
          <ProtectedRoute>
            <MiniThreadScreen />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
