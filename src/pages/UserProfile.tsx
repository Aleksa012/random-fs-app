import { Background } from "../components/backgrounds/Background";
import { Navbar } from "../components/navbar/Navbar";
import { useEffect, useState } from "react";
import { getUser } from "../api/local-storage/localStorage";
import { getByAuthor, PostResponse } from "../api/posts/postsAPI";
import { Loading } from "./Loading";
import { Post } from "../components/posts/Post";
import { Button } from "../components/buttons/Button";

import plusIcon from "../assets/icons/plus.png";
import userIcon from "../assets/icons/user.png";
import closeIcon from "../assets/icons/close.png";
import classNames from "classnames";

export const UserProfile = () => {
  const user = getUser();
  if (!user) return;

  const [posts, setPosts] = useState<PostResponse[]>([]);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    (async () => {
      const { posts } = await getByAuthor();
      setPosts(posts);
    })();
  }, []);

  const profileMenuClass = classNames("profile__main", {
    "profile__main--active": isActive,
  });

  const activeProfileHandler = () => {
    setIsActive((prev) => !prev);
  };

  return (
    <Background className="background--profile">
      <div className="profile">
        <div className={profileMenuClass}>
          <div className="profile__menu">
            <img
              onClick={activeProfileHandler}
              src={isActive ? closeIcon : userIcon}
              alt="burger"
              className="icon icon--profile-menu"
            />
          </div>
        </div>
        <div className="profile__posts">
          <h2 className="profile__posts-header">
            <h3>My posts</h3>
            <Button>
              <span>Add new one</span>
              <img src={plusIcon} alt="plus" className="icon" />
            </Button>
          </h2>
          <div className="profile__posts-main">
            {posts.length < 1 ? (
              <Loading />
            ) : (
              posts.map((post) => {
                return <Post key={post.id} {...post} />;
              })
            )}
          </div>
        </div>
      </div>
      <Navbar />
    </Background>
  );
};
