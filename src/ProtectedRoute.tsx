import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "./components/store/store";
import { FaSpinner } from "react-icons/fa";
import styles from "./components/auth/auth.module.scss";
export function ProtectedRoute() {
  const { isLoggedIn, loading } = useSelector((state: RootState) => state.user);

  if (loading) {
    return <FaSpinner className={styles.spinner} />;
  }
  if (loading) return null;
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
