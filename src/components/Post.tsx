import { likePost, PostResponse } from "./../api/posts/postsAPI";
import classNames from "classnames";

import likeIcon from "../assets/icons/heart.png";
import { getUser } from "../api/local-storage/localStorage";
import { useState } from "react";
import { timeAgo } from "./../util/dates";

const user = getUser();

export const Post = ({
  author,
  content,
  createdAt,
  likes,
  id,
  popular,
}: PostResponse) => {
  const [likedState, setLikedState] = useState({
    total: likes.length,
    isLiked: user && likes.includes(user.id),
    popular: popular,
  });

  const likePostHandler = async () => {
    try {
      setLikedState((prev) => {
        return {
          total: prev.isLiked ? prev.total - 1 : prev.total + 1,
          isLiked: !prev.isLiked,
          popular: prev.isLiked
            ? prev.total < 5
              ? true
              : false
            : prev.total > 4
            ? false
            : true,
        };
      });
      await likePost(id);
    } catch (error) {
      //handled in interceptor
    }
  };

  const postClass = classNames("post", {
    "post--popular": likedState.popular,
  });

  const authorText =
    author !== "author deleted"
      ? `${author.firstName} ${author.lastName}`
      : author;

  const likeClass = classNames("icon", "icon--like", {
    "icon--like-active": likedState.isLiked,
  });

  return (
    <div className={postClass}>
      <span className="post__creation-date">{timeAgo(createdAt)}</span>
      <p className="post__content">{content}</p>
      <div className="post__footer wrapper wrapper--between">
        <span className="post__author">{authorText}</span>
        <div className="post__likes">
          <span className="post__like-count">{likedState.total}</span>
          <img
            onClick={likePostHandler}
            className={likeClass}
            src={likeIcon}
            alt="like icon"
          />
        </div>
      </div>
    </div>
  );
};
