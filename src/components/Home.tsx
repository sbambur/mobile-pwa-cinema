import { FC, useEffect } from "react";

interface HomeProps {
  setValue: any;
}

const Home: FC<HomeProps> = ({ setValue }) => {
  useEffect(() => {
    setValue(0);
    console.log("отработал");
  }, []);

  return (
    <div>
      <h1>Welcome to your PWA Homepage!</h1>
    </div>
  );
};

export default Home;
