import { likePost, PostResponse } from "../../api/posts/postsAPI";
import classNames from "classnames";

import likeIcon from "../../assets/icons/heart.png";
import moreIcon from "../../assets/icons/more.png";

import { getUser } from "../../api/local-storage/localStorage";
import { useState } from "react";
import { timeAgo } from "../../util/dates";
import { PostActions } from "./PostActions";

interface PostProps extends PostResponse {
  refreshPosts: (posts: PostResponse[]) => void;
}

export const Post = ({
  author,
  content,
  createdAt,
  likes,
  id,
  popular,
  refreshPosts,
}: PostProps) => {
  const user = getUser();

  const [likedState, setLikedState] = useState({
    total: likes.length,
    isLiked: user && likes.includes(user.id),
    popular: popular,
  });
  const [showActions, setShowActions] = useState(false);

  const showActionsHandler = () => {
    setShowActions((prev) => !prev);
  };

  const likePostHandler = async () => {
    try {
      setLikedState((prev) => {
        return {
          total: prev.isLiked ? prev.total - 1 : prev.total + 1,
          isLiked: !prev.isLiked,
          popular:
            (prev.isLiked && prev.total === 5 && false) ||
            (!prev.isLiked && prev.total === 4 && true),
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

  const authorFormated =
    author !== "author deleted"
      ? `${author.firstName} ${author.lastName}`
      : author;

  const likeClass = classNames("icon", "icon--like", {
    "icon--like-active": likedState.isLiked,
  });

  return (
    <div className={postClass}>
      {showActions && <PostActions refreshPosts={refreshPosts} postId={id} />}
      <div className="wrapper wrapper--between">
        <span className="post__creation-date">{timeAgo(createdAt)}</span>
        {author !== "author deleted" && author.username === user?.username && (
          <img
            onClick={showActionsHandler}
            className="icon icon--menu"
            src={moreIcon}
            alt="more"
          />
        )}
      </div>
      <p className="post__content">{content}</p>
      <div className="post__footer wrapper wrapper--between">
        <span className="post__author">{`Posted by - ${authorFormated}`}</span>
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
