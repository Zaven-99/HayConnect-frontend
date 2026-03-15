import { Routes, Route } from "react-router-dom";

import AuthPage from "./pages/AuthPage";
import "./App.css";
import MainPage from "./pages/MainPage";
import ResetPassword from "./components/auth/authReset/ResetPassword";
import { useAuth } from "./components/auth/hooks/useAuth";

function App() {
  const auth = useAuth();
  return (
    <>
      {auth.message && <div className="succes-message">{auth.message}</div>}
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route
          path="/reset-password"
          element={
            <ResetPassword handleResetPassword={auth.handleResetPassword} />
          }
        />
      </Routes>
    </>
  );
}

export default App;
