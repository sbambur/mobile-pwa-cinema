import { lazy, useState } from "react";
import { Routes, Route } from "react-router-dom";

import { AuthContext } from "context/AuthContext";

import SignIn from "components/SignIn";
import SignUp from "components/SignUp";
import MainLayout from "UI/MainLayot";

const Home = lazy(() => import("components/Home"));
const Wallet = lazy(() => import("components/Wallet"));
const Settings = lazy(() => import("components/Settings"));

const App: React.FC = () => {
  const [value, setValue] = useState<number>(0);
  const [auth, setAuth] = useState<boolean>(false);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      <Routes>
        <Route element={<MainLayout value={value} setValue={setValue} />}>
          <Route path="/" element={<Home setValue={setValue} />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/settings" element={<Settings />} />
        </Route>

        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </AuthContext.Provider>
  );
};

export default App;
