import { Background } from "../components/backgrounds/Background";
import { Navbar } from "../components/navbar/Navbar";
import { useEffect, useMemo, useState } from "react";
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
import { getSelf, UserResponse } from "./../api/users/usersAPI";
import { getAllPosts } from "./../api/posts/postsAPI";

export const UserProfile = () => {
  const [posts, setPosts] = useState<PostResponse[]>([]);
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
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const { posts } = await getAllPosts();
      setAllPosts(posts);
    })();
  }, []);

  const profileMenuClass = classNames("profile__main", {
    "profile__main--active": isActive,
  });

  const totalLiked = useMemo(() => {
    return (
      user && allPosts.filter((post) => post.likes.includes(user.id)).length
    );
  }, [posts]);

  const totalLikes = useMemo(() => {
    return posts.reduce((acc, cur) => (acc += cur.likes.length), 0);
  }, [posts]);

  const popularPosts = posts.reduce(
    (acc, cur) => (acc += cur.popular ? 1 : 0),
    0
  );

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
                <img src={userIcon} alt="profile picture" className="icon" />
              </div>
              <div className="profile__username">{user.username}</div>
              <div className="profile__details">
                <span className="profile__detail">{`Total posts: ${posts.length}`}</span>
                <span className="profile__detail">{`Popular posts: ${popularPosts}`}</span>
                <span className="profile__detail">{`Total liked: ${totalLiked}`}</span>
                <span className="profile__detail">{`Total likes: ${totalLikes}`}</span>
              </div>
              <div className="profile__menu">
                <img
                  onClick={setIsActive}
                  src={isActive ? closeIcon : userIcon}
                  alt="burger"
                  className="icon icon--profile-menu"
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
