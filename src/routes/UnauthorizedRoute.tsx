import { Navigate, RouteProps } from "react-router-dom";
import { getAuthToken } from "../api/local-storage/localStorage";

export const UnauthorizedRoute = ({ children }: RouteProps) => {
  const token = getAuthToken();

  if (token) return <Navigate to={"/"} />;

  return <>{children}</>;
};
