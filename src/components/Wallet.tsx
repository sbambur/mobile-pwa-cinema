import { FC, useEffect } from "react";
import { IconButton, List } from "@mui/material";
import { useActions } from "hooks/useActions";
import { useTypedSelector } from "hooks/useTypedSelector";
import DeleteIcon from "@mui/icons-material/Delete";
import { IHall, ISeat } from "models/session-model";

const Wallet: FC = () => {
  const { id: userId } = useTypedSelector((state) => state.user.user);
  const { tickets } = useTypedSelector((state) => state.ticket);
  const { halls } = useTypedSelector((state) => state.hall);
  const { getTickets, deleteTicket, unreserveSeat } = useActions();

  useEffect(() => {
    if (tickets.length === 0) getTickets(userId);
  }, []);

  const deleteTicketLocal = (id: string) => {
    // deleteTicket(id);
    const hallFromTicket = tickets.find((ticket) => ticket.id === id);
    const currentHall = halls.find((hall) => hall.id === hallFromTicket?.hall)!;
    const updatedHall = {
      ...currentHall,
      seats: currentHall!.seats.map((seat: ISeat) => {
        if (seat.id === hallFromTicket?.seat)
          return { ...seat, reserved: false };
        return seat;
      }),
    } as IHall;

    // unreserveSeat(updatedHall);
    // getTickets(userId);
  };

  return (
    <>
      <h1>Мои билеты</h1>
      <List
        sx={{
          width: "100%",
          position: "relative",
          overflow: "auto",
          maxHeight: "100%",
        }}
      >
        {tickets.map((ticket) => {
          const curHall = halls.find((hall) => hall.id === ticket.hall);

          console.log(curHall?.movie?.title);

          return (
            <div
              key={ticket.id}
              style={{
                padding: "5px",
                margin: "5px 0",
                background: "#FFF",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <p>{curHall?.movie?.title}</p>
                <br />
                Сиденье: {ticket.pos.seat} Ряд: {ticket.pos.row}
              </div>
              {/* <IconButton
                aria-label="delete"
                onClick={() => deleteTicketLocal(ticket.id)}
              >
                <DeleteIcon />
              </IconButton> */}
            </div>
          );
        })}
      </List>
    </>
  );
};

export default Wallet;
