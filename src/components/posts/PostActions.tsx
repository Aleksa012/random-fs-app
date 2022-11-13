import editIcon from "../../assets/icons/pencil.png";
import deleteIcon from "../../assets/icons/delete.png";

export const PostActions = () => {
  return (
    <div className="post__actions">
      <div className="wrapper">
        <img src={editIcon} alt="" className="icon" />
        <span className="post__action">Edit Post</span>
      </div>
      <div className="wrapper">
        <img src={deleteIcon} alt="" className="icon" />
        <span className="post__action">Delete Post</span>
      </div>
    </div>
  );
};
