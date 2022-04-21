import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { ISession } from "models/session-model";
import { Link } from "react-router-dom";
import { Button, Rating } from "@mui/material";
import { Box } from "@mui/system";

interface HallCardProps {
  hall: ISession;
}

const HallCard: React.FC<HallCardProps> = ({ hall }) => {
  return (
    <Card
      sx={{
        p: 2,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        boxShadow: "none",
        borderRadius: "10px",
      }}
    >
      <CardMedia
        component="img"
        style={{
          maxHeight: "340px",
          maxWidth: "227px",
          textAlign: "center",
          margin: "0 auto 10px",
          borderRadius: "10px",
        }}
        image={
          hall.movie
            ? `https://image.tmdb.org/t/p/original/${hall.movie.poster_path}`
            : ""
        }
        alt="green iguana"
      />
      <CardContent sx={{ p: 0, flex: "1 1 auto" }}>
        <Typography gutterBottom variant="h6" component="div">
          {hall.movie ? hall.movie.title : "Нет названия"}
        </Typography>

        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Зал: {hall.title}
        </Typography>

        <Typography gutterBottom variant="body2" color="text.secondary">
          {hall.movie && hall.movie.runtime
            ? Math.floor(hall.movie?.runtime / 60) +
              " ч " +
              (hall.movie?.runtime % 60) +
              " мин"
            : null}
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box sx={{ mr: 1 }}>{hall.movie?.vote_average}</Box>
          <Rating
            name="half-rating-read"
            value={hall.movie?.vote_average! / 2}
            precision={0.1}
            size="small"
            readOnly
          />
        </Box>

        {/* <Typography variant="body2" color="text.secondary">
          {hall.movie ? hall.movie.overview : "Нет названия"}
        </Typography> */}

        <Button
          variant="contained"
          size="small"
          component={Link}
          sx={{ mt: 2 }}
          to={"hall/" + hall.id}
        >
          Подробнее
        </Button>
      </CardContent>
    </Card>
  );
};

export default HallCard;
