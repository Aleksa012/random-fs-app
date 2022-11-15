import { Background } from "../components/backgrounds/Background";
import { Navbar } from "../components/navbar/Navbar";
import { useEffect, useState } from "react";
import { getByAuthor, PostResponse } from "../api/posts/postsAPI";
import { Loading } from "./Loading";
import { Post } from "../components/posts/Post";
import { Button } from "../components/buttons/Button";

import plusIcon from "../assets/icons/plus.png";
import userIcon from "../assets/icons/user.png";
import closeIcon from "../assets/icons/close.png";
import classNames from "classnames";
import { useToggle } from "./../hooks/useToggle";
import { Modal } from "./../components/modal/Modal";
import { CreatePostForm } from "../components/forms/CreatePostForm";

export const UserProfile = () => {
  const [posts, setPosts] = useState<PostResponse[]>([]);
  const [isActive, setIsActive] = useToggle();
  const [isModalOpen, setIsModalOpen] = useToggle();

  useEffect(() => {
    (async () => {
      const { posts } = await getByAuthor();
      setPosts(posts.reverse());
    })();
  }, []);

  const profileMenuClass = classNames("profile__main", {
    "profile__main--active": isActive,
  });

  const addNewPost = () => {};

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
          <div className="profile__menu">
            <img
              onClick={setIsActive}
              src={isActive ? closeIcon : userIcon}
              alt="burger"
              className="icon icon--profile-menu"
            />
          </div>
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
            {posts.length < 1 ? (
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
