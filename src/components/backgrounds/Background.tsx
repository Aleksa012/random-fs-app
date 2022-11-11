import classNames from "classnames";

export const Background = ({
  className,
  children,
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>) => {
  const backgroundClass = classNames("background", className);

  return <div className={backgroundClass}>{children}</div>;
};
