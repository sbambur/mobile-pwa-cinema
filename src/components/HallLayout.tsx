import { FC, Suspense } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";

import { Box, Button, CircularProgress, Paper } from "@mui/material";

import { Container, Content, StyledProgress } from "components/styles";
import { useTypedSelector } from "hooks/useTypedSelector";

const HallLayout: FC = () => {
  const isAuth = useTypedSelector((state) => state.user.isAuth);
  const navigate = useNavigate();

  let location = useLocation();

  if (!isAuth) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return (
    <Container>
      <Box sx={{ width: "100%", pt: 8 }}>
        <Paper
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 100,
            p: "5px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button onClick={() => navigate(-1)}>Назад</Button>
        </Paper>
      </Box>

      <Suspense
        fallback={
          <StyledProgress>
            <CircularProgress />
          </StyledProgress>
        }
      >
        <Content style={{ height: "100%", overflow: "auto" }}>
          <Outlet />
        </Content>
      </Suspense>
    </Container>
  );
};

export default HallLayout;
