import { useEffect, useState } from "react";
import type { IFormValues } from "../types/auth.types";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import {
  fetchCurrentUser,
  forgotPassword,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  setLoading,
} from "../../store/userSlice";

export const useAuth = () => {
  const [formType, setFormType] = useState("signin");
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState<string>("");

  const dispatch = useDispatch<AppDispatch>();
  const { user, isLoggedIn, loading, error } = useSelector(
    (state: RootState) => state.user,
  );

  const navigate = useNavigate();

  const toggleSwitch = (type: string) => {
    setFormType(type);
  };

  const handleLogin = async (data: IFormValues) => {
    dispatch(loginUser({ data, rememberMe }))
      .unwrap()
      .then(() => {
        navigate("/main");
      })
      .catch((err: string) => {
        console.error(err);
      });
  };

  const handleSignUp = async (data: IFormValues) => {
    dispatch(registerUser({ data, rememberMe }))
      .unwrap()
      .then(() => {
        navigate("/main");
      })
      .catch((err: string) => {
        console.error(err);
      });
  };

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  const handleLogout = async () => {
    dispatch(logoutUser())
      .unwrap()
      .then(() => navigate("/"))
      .catch((err) => console.error(err));
  };

  const handleSendEmail = async (data: IFormValues) => {
    dispatch(forgotPassword(data.email))
      .unwrap()
      .then(() => {
        setMessage("Check your email for reset link");
        setTimeout(() => {
          setMessage("");
          navigate("/");
        }, 3000);
      })
      .catch((err) => console.error(err));
  };

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const token = query.get("token");

  const handleResetPassword = (data: IFormValues, reset: () => void) => {
    dispatch(setLoading(true));
    if (!token) {
      alert("Token is missing");
      return;
    }

    dispatch(resetPassword({ token, newPassword: data.password }))
      .unwrap()
      .then(() => {
        setMessage("Password changed successfully");

        reset();

        setTimeout(() => {
          setMessage("");
          navigate("/");
        }, 3000);
      })
      .catch((err) => console.error(err))
      .finally(() => {
        dispatch(setLoading(true));
      });
  };

  return {
    handleLogin,
    handleSignUp,
    handleLogout,
    toggleSwitch,
    handleSendEmail,
    setRememberMe,
    handleResetPassword,
    formType,
    isLoggedIn,
    error,
    loading,
    user,
    rememberMe,
    message,
  };
};
