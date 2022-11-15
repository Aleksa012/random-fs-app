import { useState } from "react";

export const useToggle = () => {
  const [toggled, setToggled] = useState(false);

  const toggleHandler = () => setToggled((prev) => !prev);

  return [toggled, toggleHandler] as [boolean, () => void];
};
