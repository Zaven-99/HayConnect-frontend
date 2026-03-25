import Header from "../components/header/Header";
import PostByUserId from "../components/post/postByUserId/PostByUserId";
import ProfileHeader from "../components/profileHeader/ProfileHeader";
import animationStyles from "../styles/animation.module.scss";
const ProfilePage = () => {
  return (
    <div className={animationStyles["fadeIn"]}>
      <Header />
      <ProfileHeader />
      <PostByUserId />
    </div>
  );
};

export default ProfilePage;
