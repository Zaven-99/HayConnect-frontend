import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../store/userSlice";
import type { AppDispatch } from "../../store/store";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
export const useLogout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/");
  };

  const username = useSelector((state: RootState) => state.user.user?.name);
  const lastName = useSelector((state: RootState) => state.user.user?.lastName);

  return { handleLogout, username, lastName };
};
