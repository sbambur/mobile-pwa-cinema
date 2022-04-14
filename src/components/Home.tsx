import { Button, List, ListItem, ListItemText } from "@mui/material";
import { IUser } from "models/IUser";
import { FC, useEffect, useState } from "react";
import UserService from "service/UserService";

interface HomeProps {
  setValue: any;
}

const Home: FC<HomeProps> = ({ setValue }) => {
  const [users, setUser] = useState<IUser[]>([]);

  useEffect(() => {
    setValue(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUsers = async () => {
    try {
      const response = await UserService.fetchUsers();
      setUser(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <h1>Welcome to your PWA Homepage!</h1>
      <Button variant="contained" onClick={getUsers}>
        Получить пользоватлей
      </Button>
      <div>
        <List>
          {users.map((user) => {
            return (
              <ListItem key={user.email}>
                <ListItemText primary={user.email} />
              </ListItem>
            );
          })}
        </List>
      </div>
    </div>
  );
};

export default Home;
