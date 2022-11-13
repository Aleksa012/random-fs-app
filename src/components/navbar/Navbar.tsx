import twoGridIcon from "../../assets/icons/grid-two.png";
import threeGridIcon from "../../assets/icons/grid-three.png";
import squareIcon from "../../assets/icons/square.png";
import burgerIcon from "../../assets/icons/burger.png";
import exitIcon from "../../assets/icons/exit.png";
import closeIcon from "../../assets/icons/close.png";
import settingsIcon from "../../assets/icons/setting.png";
import classNames from "classnames";
import { useState } from "react";
import { Button } from "../buttons/Button";
import { clearLocalStorage } from "../../api/local-storage/localStorage";
import { useNavigate } from "react-router-dom";
import { createPost, PostResponse } from "../../api/posts/postsAPI";
import { getAllPosts } from "../../api/posts/postsAPI";
import { NavSettings } from "./NavSettings";

type Layout = "single" | "double" | "triple";

interface NavbarProps {
  handleLayoutChange?: (layout: Layout) => void;
  setNewPosts: (newPosts: PostResponse[]) => void;
}

export const Navbar = ({ handleLayoutChange, setNewPosts }: NavbarProps) => {
  const [showSettings, setShowSettings] = useState(false);
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

  const showSettingsHandler = () => {
    setShowSettings((prev) => !prev);
  };

  const settingsIconClass = classNames("icon", "icon--settings", {
    "icon--settings-open": showSettings,
    "icon--settings-closed": !showSettings,
  });

  return (
    <div className={navClass}>
      <h2 className="nav__title">Navigation and settings</h2>
      <div className="nav__menu">
        <img
          onClick={activeNavHandler}
          src={isActive ? closeIcon : burgerIcon}
          alt="burger"
          className="icon icon--nav-menu"
        />
      </div>
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
      {showSettings && (
        <NavSettings>
          {handleLayoutChange && (
            <div className="nav__layout">
              <h2 className="nav__layout-title">Choose a layout</h2>
              <div className="wrapper">
                <img
                  onClick={() => handleLayoutChange("single")}
                  className={layoutIconClass("single")}
                  src={squareIcon}
                  alt="square"
                />
                <img
                  onClick={() => handleLayoutChange("double")}
                  className={layoutIconClass("double")}
                  src={twoGridIcon}
                  alt="sqare^2"
                />
                <img
                  onClick={() => handleLayoutChange("triple")}
                  className={layoutIconClass("triple")}
                  src={threeGridIcon}
                  alt="square^3"
                />
              </div>
            </div>
          )}
        </NavSettings>
      )}
      <img
        onClick={showSettingsHandler}
        src={showSettings ? closeIcon : settingsIcon}
        alt="settings"
        className={settingsIconClass}
      />
      <Button
        className="btn--logout"
        onClick={() => {
          clearLocalStorage();
          navigate("/login");
        }}
      >
        Logout
        <img src={exitIcon} alt="exit" className="icon icon--exit" />
      </Button>
    </div>
  );
};
