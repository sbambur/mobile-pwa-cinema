import { Button } from "@mui/material";
import { FC, useContext } from "react";
import { AuthContext } from "context/AuthContext";

const Settings: FC = () => {
  const [auth, setAuth] = useContext(AuthContext);

  return (
    <>
      <h1>This is a App Settings </h1>
      <Button variant="contained" onClick={() => setAuth(!auth)}>
        logout
      </Button>
    </>
  );
};

export default Settings;
