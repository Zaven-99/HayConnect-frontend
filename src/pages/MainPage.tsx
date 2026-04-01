import CreatePost from "../components/createPost/CreatePost";
import Header from "../components/header/Header";
import Post from "../components/post/post/Post";
import animationStyles from "../styles/animation.module.scss";

const MainPage = () => {
  return (
    <div>
      <div className={animationStyles["fadeIn"]}>
        <Header />
        <CreatePost />
        <Post />
      </div>
    </div>
  );
};

export default MainPage;
