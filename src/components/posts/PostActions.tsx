import editIcon from "../../assets/icons/pencil.png";
import deleteIcon from "../../assets/icons/delete.png";
import {
  deletePost,
  getByAuthor,
  PostResponse,
} from "../../api/posts/postsAPI";

interface PostActionsProps {
  postId: string;
  refreshPosts: (posts: PostResponse[]) => void;
}

export const PostActions = ({ postId, refreshPosts }: PostActionsProps) => {
  const handlePostDeletion = async () => {
    await deletePost(postId);
    const { posts } = await getByAuthor();
    refreshPosts(posts.reverse());
  };

  return (
    <div className="post__actions">
      <div className="wrapper">
        <img src={editIcon} alt="" className="icon" />
        <span className="post__action">Edit Post</span>
      </div>
      <div onClick={handlePostDeletion} className="wrapper">
        <img src={deleteIcon} alt="" className="icon" />
        <span className="post__action">Delete Post</span>
      </div>
    </div>
  );
};
