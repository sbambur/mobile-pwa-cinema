import { Button } from "@mui/material";
import { useActions } from "hooks/useActions";
import { FC } from "react";

const Settings: FC = () => {
  const { logout } = useActions();

  const logoutHandler = () => {
    logout();
  };

  return (
    <>
      <h1>Профиль</h1>
      <Button variant="contained" onClick={logoutHandler}>
        Выйти
      </Button>
    </>
  );
};

export default Settings;
