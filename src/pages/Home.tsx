import { removeAuthToken } from "../api/local-storage/localStorage";
import { Button } from "../components/buttons/Button";

export const Home = () => {
  return (
    <div>
      <Button onClick={() => removeAuthToken()}>Logout</Button>
    </div>
  );
};
