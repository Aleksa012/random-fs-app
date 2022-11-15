import { Background } from "../components/backgrounds/Background";
import { Navbar } from "../components/navbar/Navbar";
import { useEffect, useMemo, useState } from "react";
import { getByAuthor, PostResponse } from "../api/posts/postsAPI";
import { Loading } from "./Loading";
import { Post } from "../components/posts/Post";
import { Button } from "../components/buttons/Button";

import plusIcon from "../assets/icons/plus.png";
import defaultUserIcon from "../assets/icons/user.png";
import closeIcon from "../assets/icons/close.png";
import smileIcon from "../assets/icons/smiling.png";
import sadIcon from "../assets/icons/sad.png";
import angryIcon from "../assets/icons/angry.png";
import starIcon from "../assets/icons/star.png";
import winkIcon from "../assets/icons/wink.png";

import classNames from "classnames";
import { useToggle } from "./../hooks/useToggle";
import { Modal } from "./../components/modal/Modal";
import { CreatePostForm } from "../components/forms/CreatePostForm";
import { getSelf, UserResponse } from "./../api/users/usersAPI";
import { getAllPosts } from "./../api/posts/postsAPI";

export const UserProfile = () => {
  const [posts, setPosts] = useState<PostResponse[]>();
  const [allPosts, setAllPosts] = useState<PostResponse[]>([]);
  const [isActive, setIsActive] = useToggle();
  const [isModalOpen, setIsModalOpen] = useToggle();
  const [user, setUser] = useState<UserResponse>();

  useEffect(() => {
    (async () => {
      const { posts } = await getByAuthor();
      setPosts(posts.reverse());
      const user = await getSelf();
      setUser(user);
      const data = await getAllPosts();
      setAllPosts(data.posts);
    })();
  }, []);

  const profileMenuClass = classNames("profile__main", {
    "profile__main--active": isActive,
  });

  const totalLiked = useMemo(() => {
    return !user
      ? "..."
      : allPosts.filter((post) => post.likes.includes(user.id)).length;
  }, [allPosts, posts]);

  const totalLikes = useMemo(() => {
    return !posts
      ? "..."
      : posts.reduce((acc, cur) => (acc += cur.likes.length), 0);
  }, [posts]);

  const popularPosts = !posts
    ? "..."
    : posts.reduce((acc, cur) => (acc += cur.popular ? 1 : 0), 0);

  const userIcon = () => {
    if (!user) return defaultUserIcon;
    switch (user.icon) {
      case "smileIcon":
        return smileIcon;
      case "angryIcon":
        return angryIcon;
      case "sadIcon":
        return sadIcon;
      case "winkIcon":
        return winkIcon;
      case "starIcon":
        return starIcon;
      default:
        return defaultUserIcon;
    }
  };

  const userIconClass = classNames("icon", {
    default: user?.icon === "/",
  });

  const profileMenuIconClass = classNames("icon", "icon--profile-menu", {
    default: user?.icon === "/" || isActive,
  });

  return (
    <Background className="background--profile">
      {isModalOpen && (
        <Modal title="Create post" closeModal={setIsModalOpen}>
          <CreatePostForm
            closeModal={setIsModalOpen}
            refreshPosts={(posts) => setPosts(posts)}
          />
        </Modal>
      )}
      <div className="profile">
        <div className={profileMenuClass}>
          {!user ? (
            <Loading />
          ) : (
            <>
              <div className="profile__picture">
                <img
                  src={userIcon()}
                  alt="profile picture"
                  className={userIconClass}
                />
              </div>
              <div className="profile__username">{user.username}</div>
              <div className="profile__details">
                <span className="profile__detail">{`Total posts: ${
                  !posts ? "..." : posts.length
                }`}</span>
                <span className="profile__detail">{`Popular posts: ${popularPosts}`}</span>
                <span className="profile__detail">{`Total liked: ${totalLiked}`}</span>
                <span className="profile__detail">{`Total likes: ${totalLikes}`}</span>
              </div>
              <div className="profile__menu">
                <img
                  onClick={setIsActive}
                  src={isActive ? closeIcon : userIcon()}
                  alt="burger"
                  className={profileMenuIconClass}
                />
              </div>
            </>
          )}
        </div>
        <div className="profile__posts">
          <h2 className="profile__posts-header">
            <span>My posts</span>
            <Button onClick={setIsModalOpen}>
              <span>Add new one</span>
              <img src={plusIcon} alt="plus" className="icon" />
            </Button>
          </h2>
          <div className="profile__posts-main">
            {!posts ? (
              <Loading />
            ) : (
              posts.map((post) => {
                return (
                  <Post
                    refreshPosts={(posts) => setPosts(posts)}
                    key={post.id}
                    {...post}
                  />
                );
              })
            )}
          </div>
        </div>
      </div>
      <Navbar />
    </Background>
  );
};
