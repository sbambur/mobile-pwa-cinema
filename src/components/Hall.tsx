import { Box, Button, Paper } from "@mui/material";
import { useActions } from "hooks/useActions";
import { useTypedSelector } from "hooks/useTypedSelector";
import { IHall, ISeat } from "models/hall-model";
import { ITicket } from "models/ticket-model";
import { FC, useEffect, useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Hall: FC = () => {
  const { id: hallId } = useParams();
  const { id: userId } = useTypedSelector((state) => state.user.user);
  const { halls } = useTypedSelector((state) => state.hall);

  const hallFromStore = halls.find((hall) => hall.id === hallId)!;

  const [currentHall, setCurrentHall] = useState<IHall>(hallFromStore);
  const [sumWallets, setSumWallets] = useState<number>(0);
  const { getHall, reserveSeat, saveTickets, getTickets } = useActions();

  useEffect(() => {
    getHall(hallId!);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    if (hallId) {
      if (JSON.stringify(hallFromStore) !== JSON.stringify(currentHall)) {
        setCurrentHall(hallFromStore);
      }
    }
  }, [hallId, halls]);

  useEffect(() => {
    if (currentHall) {
      const sumWalletsCal = getHallsSum(currentHall);
      if (sumWalletsCal !== sumWallets) {
        setSumWallets(sumWalletsCal);
      }
    }
  }, [currentHall]);

  const reserveSeatLocal = (id: string) => {
    let updatedHall = {
      ...currentHall,
      seats: currentHall!.seats.map((seat: ISeat) => {
        if (seat.id === id) return { ...seat, sale: !seat.sale };
        return seat;
      }),
    } as IHall;
    setCurrentHall(updatedHall);
  };

  const getHallsSum = (hall: IHall) => {
    const sum = hall.seats.reduce((acc: number, seat: ISeat) => {
      if (seat.sale) {
        acc += +seat.price;
      }
      return acc;
    }, 0);
    return sum;
  };

  const saveAndReserve = () => {
    const reserveSeats = currentHall.seats.filter((seat) => seat.sale);
    const ticketsBuy = reserveSeats.map((seat) => {
      return {
        user: userId,
        hall: currentHall.id,
        seat: seat.id,
        seatNumber: seat.seatNumber,
        price: seat.price,
        pos: seat.pos,
      } as ITicket;
    });

    saveTickets(ticketsBuy);
    reserveSeat(currentHall);
    getTickets(userId);
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
              onClick={() => reserveSeatLocal(seat.id)}
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
          <div>Сумма: {sumWallets} руб</div>
          <Button
            variant="contained"
            size="large"
            onClick={() => saveAndReserve()}
            disabled={sumWallets ? false : true}
          >
            Оплатить
          </Button>
        </Paper>
      </Box>
    </>
  );
};

export default Hall;
