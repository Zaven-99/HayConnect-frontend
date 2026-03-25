import { Routes, Route } from "react-router-dom";

import AuthPage from "./pages/AuthPage";
import "./App.css";
import MainPage from "./pages/MainPage";
import ResetPassword from "./components/auth/authReset/ResetPassword";
import { useAuth } from "./components/auth/hooks/useAuth";
import { ProtectedRoute } from "./ProtectedRoute";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchCurrentUser } from "./components/store/userSlice";
import type { AppDispatch } from "./components/store/store";
import ProfilePage from "./pages/ProfilePage";
import UserPage from "./pages/UserPage";

function App() {
  const auth = useAuth();

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return (
    <>
      {auth.message && <div className="succes-message">{auth.message}</div>}
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/main" element={<MainPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/user/:id" element={<UserPage />} />
        </Route>
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
