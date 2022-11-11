import { Navigate, RouteProps } from "react-router-dom";
import { getAuthToken } from "../api/local-storage/localStorage";

export const AuthorizedRoute = ({ children }: RouteProps) => {
  const token = getAuthToken();

  if (!token) return <Navigate to={"/login"} />;

  return <>{children}</>;
};
