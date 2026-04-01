import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import { useClosing } from "../../../../utils/useClosing";
import { closeChat, openChat, startClosingChat } from "../../store/chatSlice";
import {
  closeUserMenu,
  openUserMenu,
  startClosingUserMenu,
} from "../../store/userMenuSlice";
import {
  closeNotifications,
  openNotifications,
  startClosingNotifications,
} from "../../store/notificationSlice";
export const useHeader = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isChatOpen = useSelector((state: RootState) => state.chat.isOpen);
  const isUserMenuOpen = useSelector(
    (state: RootState) => state.userMenu.isOpen,
  );
  const isNotificationsOpen = useSelector(
    (state: RootState) => state.notifications.isOpen,
  );
  const chat = useClosing(() => dispatch(closeChat()));
  const notifications = useClosing(() => dispatch(closeNotifications()));
  const menu = useClosing(() => dispatch(closeUserMenu()));
  const avatar = useSelector((state: RootState) => state.user.user?.avatar);

  const hanleMenuClick = () => {
    if (isUserMenuOpen) {
      dispatch(startClosingUserMenu());
      menu.handleClose();
    } else {
      dispatch(openUserMenu());
    }
  };
  const handleChatClick = () => {
    if (isChatOpen) {
      dispatch(startClosingChat());
      chat.handleClose();
    } else {
      dispatch(openChat());
    }
  };

  const handleNotificationsClick = () => {
    if (isNotificationsOpen) {
      dispatch(startClosingNotifications());
      notifications.handleClose();
    } else {
      dispatch(openNotifications());
    }
  };
  return {
    isChatOpen,
    isUserMenuOpen,
    isNotificationsOpen,
    avatar,
    dispatch,
    chat,
    menu,
    hanleMenuClick,
    handleChatClick,
    handleNotificationsClick,
  };
};
