import { removeAuthToken } from "../api/local-storage/localStorage";
import { Button } from "../components/buttons/Button";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Button
        onClick={() => {
          navigate("/login");
          removeAuthToken();
        }}
      >
        Logout
      </Button>
    </div>
  );
};
