import { CircularProgress, Stack } from "@mui/material";
import { useActions } from "hooks/useActions";
import { useTypedSelector } from "hooks/useTypedSelector";
import { FC, useEffect } from "react";
import HallCard from "components/HallCard";
import { StyledProgress } from "components/styles";

// Swiper test
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper";

interface HomeProps {
  setValue: (value: number) => void;
}

const Home: FC<HomeProps> = ({ setValue }) => {
  const { sessions, loading } = useTypedSelector((state) => state.hall);
  const { getSessions } = useActions();

  useEffect(() => {
    setValue(0);

    if (!sessions.length) {
      getSessions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h1>
        <span style={{ color: "#1976d2" }}>Miramax</span> cinema
      </h1>
      {loading ? (
        <StyledProgress>
          <CircularProgress />
        </StyledProgress>
      ) : (
        <Stack direction="row" spacing={2} mt={5}>
          <Swiper
            slidesPerView={1.5}
            spaceBetween={10}
            modules={[Pagination]}
            className="mySwiper"
          >
            {sessions.map((session) => (
              <SwiperSlide key={session.id}>
                <HallCard hall={session} />
              </SwiperSlide>
            ))}
          </Swiper>
        </Stack>
      )}
    </>
  );
};

export default Home;
