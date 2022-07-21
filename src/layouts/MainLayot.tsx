import { FC, Suspense } from "react";
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";

import {
  Box,
  CircularProgress,
  BottomNavigationAction,
  BottomNavigation,
  Paper,
} from "@mui/material";
import GroupWorkIcon from "@mui/icons-material/GroupWork";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

import { Container, Content, StyledProgress } from "components/styles";
import { useTypedSelector } from "hooks/useTypedSelector";

interface MainLayoutProps {
  value: number;
  setValue: any;
}

const MainLayout: FC<MainLayoutProps> = ({ value, setValue }: any) => {
  const isAuth = useTypedSelector((state) => state.user.isAuth);

  let location = useLocation();

  if (!isAuth) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return (
    <Container>
      <Suspense
        fallback={
          <StyledProgress>
            <CircularProgress />
          </StyledProgress>
        }
      >
        <Content style={{ height: "100%", overflow: "hidden" }}>
          <Outlet />
        </Content>
      </Suspense>
      <Box sx={{ width: "100%", pt: 8 }}>
        <Paper
          sx={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 100 }}
        >
          <BottomNavigation
            value={value}
            onChange={(e, newValue) => {
              setValue(newValue);
            }}
          >
            <BottomNavigationAction
              component={Link}
              to="/"
              label="Фильмы"
              icon={<GroupWorkIcon />}
            />
            <BottomNavigationAction
              component={Link}
              to="/wallet"
              label="Билеты"
              icon={<AccountBalanceWalletIcon />}
            />
            <BottomNavigationAction
              component={Link}
              to="/settings"
              label="Настройки"
              icon={<AccountCircleIcon />}
            />
          </BottomNavigation>
        </Paper>
      </Box>
    </Container>
  );
};

export default MainLayout;
