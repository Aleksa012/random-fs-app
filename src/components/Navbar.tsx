import twoGridIcon from "../assets/icons/grid-two.png";
import threeGridIcon from "../assets/icons/grid-three.png";
import square from "../assets/icons/square.png";
import burger from "../assets/icons/burger.png";
import classNames from "classnames";
import { useState } from "react";

type Layout = "single" | "double" | "triple";

interface NavbarProps {
  handleLayoutChange?: (layout: Layout) => void;
}

export const Navbar = ({ handleLayoutChange }: NavbarProps) => {
  const [isActive, setIsActive] = useState(false);

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
      <div className="nav__menu">
        <img
          onClick={activeNavHandler}
          src={burger}
          alt="burger"
          className="icon icon--burger-menu"
        />
      </div>
      {handleLayoutChange && (
        <div className="wrapper wrapper--between">
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
      )}
    </div>
  );
};
