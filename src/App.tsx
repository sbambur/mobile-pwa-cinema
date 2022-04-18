import { lazy, useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import SignIn from "components/SignIn";
import SignUp from "components/SignUp";
import MainLayout from "UI/MainLayot";
import { useActions } from "hooks/useActions";
import Hall from "components/Hall";
import HallLayout from "components/HallLayout";

const Home = lazy(() => import("components/Home"));
const Wallet = lazy(() => import("components/Wallet"));
const Settings = lazy(() => import("components/Settings"));

const App: React.FC = () => {
  const [value, setValue] = useState<number>(0);
  const { checkAuth } = useActions();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      checkAuth();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Routes>
      <Route element={<MainLayout value={value} setValue={setValue} />}>
        <Route path="/" element={<Home setValue={setValue} />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>

      <Route element={<HallLayout />}>
        <Route path="/hall/:id" element={<Hall />} />
      </Route>

      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
};

export default App;
