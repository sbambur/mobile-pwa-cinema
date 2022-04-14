import { lazy, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import SignIn from "components/SignIn";
import SignUp from "components/SignUp";
import MainLayout from "UI/MainLayot";
import { useTypedSelector } from "hooks/TypedSelector";
import { useDispatch } from "react-redux";
import { checkAuth } from "store/reducers/authReducer";

const Home = lazy(() => import("components/Home"));
const Wallet = lazy(() => import("components/Wallet"));
const Settings = lazy(() => import("components/Settings"));

const App: React.FC = () => {
  const isUser = useTypedSelector((state) => state.user);
  const [value, setValue] = useState<number>(0);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isUser) {
      dispatch(checkAuth());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Routes>
      <Route element={<MainLayout value={value} setValue={setValue} />}>
        <Route path="/" element={<Home setValue={setValue} />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
};

export default App;
