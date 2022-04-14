import { Button } from "@mui/material";
import { FC } from "react";
import { useDispatch } from "react-redux";
import { logout } from "store/reducers/authReducer";

const Settings: FC = () => {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
    window.location.reload();
  };

  return (
    <>
      <h1>This is a App Settings </h1>
      <Button variant="contained" onClick={logoutHandler}>
        logout
      </Button>
    </>
  );
};

export default Settings;
