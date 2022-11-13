import { PropsWithChildren } from "react";

export const NavSettings = ({ children }: PropsWithChildren) => {
  return (
    <div className="nav__settings">
      <h2 className="nav__settings-title">Settings</h2>
      {children}
    </div>
  );
};
