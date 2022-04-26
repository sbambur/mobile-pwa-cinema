import { Box, Button, Paper } from "@mui/material";
import { useActions } from "hooks/useActions";
import { useTypedSelector } from "hooks/useTypedSelector";
import { IScheme, ISeat } from "models/scheme-model";
import { ISession } from "models/session-model";
import { ITicketReq } from "models/ticket-model";
import { FC, useEffect, useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Hall: FC = () => {
  const { id: sessionId } = useParams();
  const { id: userId } = useTypedSelector((state) => state.user.user);
  const { sessions } = useTypedSelector((state) => state.hall);
  const { scheme } = useTypedSelector((state) => state.scheme);

  const [currentSession, setcurrentSession] = useState<ISession | null>(null);
  const [currentHall, setCurrentHall] = useState<IScheme | null>(null);
  const [sumWallets, setSumWallets] = useState<number>(0);

  const { getSession, saveTickets, getTickets } = useActions();

  useEffect(() => {
    sessionId && getSession(sessionId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (currentHall) {
      const sumWalletsCal = getHallsSum(currentHall!);
      if (sumWalletsCal !== sumWallets) {
        setSumWallets(sumWalletsCal);
      }
    }
  }, [currentHall]);

  useLayoutEffect(() => {
    if (sessionId) {
      const sessionFromStore = sessions.find(
        (session) => session.id === sessionId
      );
      if (
        JSON.stringify(sessionFromStore) !== JSON.stringify(currentSession) &&
        sessionFromStore
      ) {
        setcurrentSession(sessionFromStore);
      }

      const finder = scheme.find(
        (schemeOne) => schemeOne.id === currentSession?.hall
      ) as IScheme;

      setCurrentHall(finder);
    }
  }, [sessionId, sessions]);

  const reserveSeatLocal = (id: string) => {
    let updatedHall = {
      ...currentHall,
      seats: currentHall!.seats.map((seat: ISeat) => {
        if (seat.id === id) return { ...seat, sale: !seat.sale };
        return seat;
      }),
    } as IScheme;
    setCurrentHall(updatedHall);
  };

  const getHallsSum = (hall: IScheme) => {
    const sum = hall.seats.reduce((acc: number, seat: ISeat) => {
      if (seat.sale) {
        acc += +seat.price;
      }
      return acc;
    }, 0);
    return sum;
  };

  const saveAndReserve = () => {
    const reserveSeats = currentHall!.seats.filter((seat) => seat.sale);
    const ticketsBuy = reserveSeats.map((seat) => {
      return {
        user: userId,
        hall: currentHall!.id,
        seat: seat.id,
        seatNumber: seat.seatNumber,
        price: seat.price,
        pos: seat.pos,
      } as ITicketReq;
    });

    console.log(JSON.stringify(ticketsBuy));

    saveTickets(ticketsBuy);
    getTickets(userId);
  };

  if (!currentSession) {
    return <div>упс</div>;
  }

  return (
    <>
      <h3>Зал: {currentSession.title}</h3>
      <p>
        фильм:{" "}
        {currentSession.movie ? currentSession.movie.title : "А фильма нет"}{" "}
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
        {currentHall &&
          currentHall.seats.map((seat) => {
            return (
              <div
                key={seat.id}
                onClick={() => reserveSeatLocal(seat.id)}
                style={{
                  background: seat.sale ? "#48c04e" : "#fff",
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
