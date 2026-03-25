import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import type { AppDispatch } from "../components/store/store";
import { useEffect } from "react";
import { fetchUserById } from "../components/store/userSlice";
import Header from "../components/header/Header";
import ProfileHeader from "../components/profileHeader/ProfileHeader";
import PostByUserId from "../components/post/postByUserId/PostByUserId";
import animationStyles from "../styles/animation.module.scss";
const UserPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (id) dispatch(fetchUserById(Number(id)));
  }, [id, dispatch]);

  return (
    <div className={animationStyles["fadeIn"]}>
      <Header />
      <ProfileHeader userId={Number(id)} />
      <PostByUserId userId={Number(id)} />
    </div>
  );
};

export default UserPage;
