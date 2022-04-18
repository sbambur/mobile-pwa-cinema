import { Box, Button, Paper } from "@mui/material";
import { useActions } from "hooks/useActions";
import { useTypedSelector } from "hooks/useTypedSelector";
import { IHall, ISeat } from "models/hall-model";
import { FC, useEffect, useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Hall: FC = () => {
  const { halls } = useTypedSelector((state) => state.hall);
  const [currentHall, setCurrentHall] = useState<IHall | null>(null);
  const { getHall, reserveSeat } = useActions();
  const { id: hallId } = useParams();

  useEffect(() => {
    getHall(hallId!);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    setCurrentHall(halls.find((hall) => hall.id === hallId)!);
  }, [hallId, halls]);

  const reserveSeatLocal = (id: number) => {
    return () => {
      let updatedHall = {
        ...currentHall,
        seats: currentHall!.seats.map((seat: ISeat) => {
          if (seat.id === id) return { ...seat, sale: !seat.reserved };
          return seat;
        }),
      } as IHall;
      setCurrentHall(updatedHall);
    };
  };

  if (!currentHall) {
    return <div>упс</div>;
  }

  return (
    <>
      <h3>Зал: {currentHall.title}</h3>
      <p>
        фильм: {currentHall.movie ? currentHall.movie.title : "А фильма нет"}{" "}
      </p>

      <Paper
        sx={{ mt: 4, mb: 2, py: 2, textAlign: "center", boxShadow: "none" }}
      >
        Экран
      </Paper>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(8, 40px)",
          gridAutoRows: "40px",
          gap: "10px 10px",
          width: "fit-content",
          margin: "0 auto",
        }}
      >
        {currentHall.seats.map((seat) => {
          return (
            <div
              key={seat.id}
              onClick={reserveSeatLocal(seat.id)}
              style={{
                background: seat.reserved
                  ? "#c1c1c1"
                  : seat.sale
                  ? "#48c04e"
                  : "#fff",

                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {seat.pos.seat}
              <br />
            </div>
          );
        })}
      </div>

      <Box sx={{ width: "100%" }}>
        <Paper
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 100,
            p: "5px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>Сумма: 0 руб</div>
          <Button
            variant="contained"
            size="large"
            onClick={() => reserveSeat(currentHall)}
          >
            Оплатить
          </Button>
        </Paper>
      </Box>
    </>
  );
};

export default Hall;
