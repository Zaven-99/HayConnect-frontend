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
import { useSelector } from "react-redux";
import type { RootState } from "./components/store/store";
import Chat from "./components/chat/Chat";
import Notifications from "./components/notifications/Notifications";
function App() {
  const auth = useAuth();

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  const isChatOpen = useSelector((state: RootState) => state.chat.isOpen);
  const isChatClosing = useSelector((state: RootState) => state.chat.isClosing);
  const isNotificationsOpen = useSelector(
    (state: RootState) => state.notifications.isOpen,
  );
  const isNotificationClosing = useSelector(
    (state: RootState) => state.notifications.isClosing,
  );

  return (
    <>
      {auth.message && <div className="succes-message">{auth.message}</div>}
      {(isChatOpen || isChatClosing) && <Chat isClosing={isChatClosing} />}
      {(isNotificationsOpen || isNotificationClosing) && (
        <Notifications isClosing={isNotificationClosing} />
      )}
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
