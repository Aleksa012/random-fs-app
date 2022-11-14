import twoGridIcon from "../../assets/icons/grid-two.png";
import threeGridIcon from "../../assets/icons/grid-three.png";
import squareIcon from "../../assets/icons/square.png";
import burgerIcon from "../../assets/icons/burger.png";
import exitIcon from "../../assets/icons/exit.png";
import closeIcon from "../../assets/icons/close.png";
import settingsIcon from "../../assets/icons/setting.png";
import arrowIcon from "../../assets/icons/arrow.png";

import classNames from "classnames";
import { useState } from "react";
import { Button } from "../buttons/Button";
import { clearLocalStorage } from "../../api/local-storage/localStorage";
import { NavLink, useNavigate } from "react-router-dom";
import { PostResponse } from "../../api/posts/postsAPI";
import { NavSettings } from "./NavSettings";

type Layout = "single" | "double" | "triple";

interface NavbarProps {
  handleLayoutChange?: (layout: Layout) => void;
}

export const Navbar = ({ handleLayoutChange }: NavbarProps) => {
  const [showSettings, setShowSettings] = useState(false);
  const [isActive, setIsActive] = useState(false);

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

  const closeOnBackdrop = () => {
    setShowSettings(false);
    activeNavHandler();
  };

  const settingsIconClass = classNames("icon", "icon--settings", {
    "icon--settings-open": showSettings,
    "icon--settings-closed": !showSettings,
  });

  return (
    <>
      {isActive && (
        <div onClick={closeOnBackdrop} className="nav__backdrop"></div>
      )}
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
        <NavLink
          className={({ isActive }) =>
            classNames("nav__link", {
              "nav__link--active": isActive,
            })
          }
          to="/"
        >
          Feed
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            classNames("nav__link", {
              "nav__link--active": isActive,
            })
          }
          to="/my-profile"
        >
          My Profile
        </NavLink>
        <img
          onClick={showSettingsHandler}
          src={showSettings ? arrowIcon : settingsIcon}
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
    </>
  );
};
