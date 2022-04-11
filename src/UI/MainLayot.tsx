import { FC, Suspense, useContext } from "react";
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";

import { AuthContext } from "context/AuthContext";

import {
  Box,
  CircularProgress,
  BottomNavigationAction,
  BottomNavigation,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

import { Container, Content, StyledProgress } from "components/styles";

interface MainLayoutProps {
  value: number;
  setValue: any;
}

const MainLayout: FC<MainLayoutProps> = ({ value, setValue }: any) => {
  const [auth] = useContext(AuthContext);

  let location = useLocation();

  if (!auth) {
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
        <Content>
          <Outlet />
        </Content>
      </Suspense>
      <Box sx={{ width: "100%" }}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(e, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction
            component={Link}
            to="/"
            label="Home"
            icon={<HomeIcon />}
          />
          <BottomNavigationAction
            component={Link}
            to="/wallet"
            label="Wallet"
            icon={<AccountBalanceWalletIcon />}
          />
          <BottomNavigationAction
            component={Link}
            to="/settings"
            label="Settings"
            icon={<SettingsIcon />}
          />
        </BottomNavigation>
      </Box>
    </Container>
  );
};

export default MainLayout;
