import twoGridIcon from "../assets/icons/grid-two.png";
import threeGridIcon from "../assets/icons/grid-three.png";
import square from "../assets/icons/square.png";
import burger from "../assets/icons/burger.png";
import exit from "../assets/icons/exit.png";
import classNames from "classnames";
import { useState } from "react";
import { Button } from "./buttons/Button";
import { clearLocalStorage } from "../api/local-storage/localStorage";
import { useNavigate } from "react-router-dom";
import { createPost, PostResponse } from "../api/posts/postsAPI";
import { getAllPosts } from "./../api/posts/postsAPI";

type Layout = "single" | "double" | "triple";

interface NavbarProps {
  handleLayoutChange?: (layout: Layout) => void;
  setNewPosts: (newPosts: PostResponse[]) => void;
}

export const Navbar = ({ handleLayoutChange, setNewPosts }: NavbarProps) => {
  const [isActive, setIsActive] = useState(false);
  const [newMockPost, setNewMockPost] = useState({
    content: "",
    img: "",
  });

  const navigate = useNavigate();

  const layoutIconClass = (layout: Layout) =>
    classNames("icon", "icon--layout", `icon--layout-${layout}`);

  const navClass = classNames("nav", {
    "nav--active": isActive,
  });

  const activeNavHandler = () => {
    setIsActive((prev) => !prev);
  };

  return (
    <div className={navClass}>
      <h2 className="nav__title">Navigation and settings</h2>
      <div className="nav__menu">
        <img
          onClick={activeNavHandler}
          src={burger}
          alt="burger"
          className="icon icon--burger-menu"
        />
      </div>
      {handleLayoutChange && (
        <div className="nav__layout">
          <h2 className="nav__layout-title">Choose a layout</h2>
          <div className="wrapper">
            <img
              onClick={() => handleLayoutChange("single")}
              className={layoutIconClass("single")}
              src={square}
              alt=""
            />
            <img
              onClick={() => handleLayoutChange("double")}
              className={layoutIconClass("double")}
              src={twoGridIcon}
              alt=""
            />
            <img
              onClick={() => handleLayoutChange("triple")}
              className={layoutIconClass("triple")}
              src={threeGridIcon}
              alt=""
            />
          </div>
        </div>
      )}
      <div style={{ padding: "1rem 0" }} className="mock__post">
        <input
          type="text"
          value={newMockPost.content}
          onChange={(e) => {
            setNewMockPost((prev) => {
              return { ...prev, content: e.target.value };
            });
          }}
        />
        <Button
          onClick={async () => {
            try {
              await createPost(newMockPost);
              const data = await getAllPosts();
              setNewPosts(data.posts.reverse());
              setNewMockPost({
                content: "",
                img: "",
              });
            } catch (error) {}
          }}
        >
          Create Mock Post
        </Button>
      </div>
      <Button
        className="btn--logout"
        onClick={() => {
          clearLocalStorage();
          navigate("/login");
        }}
      >
        Logout
        <img src={exit} alt="exit" className="icon icon--exit" />
      </Button>
    </div>
  );
};
