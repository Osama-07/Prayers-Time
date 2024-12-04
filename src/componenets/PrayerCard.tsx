import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import Prayer from "../Types/PrayerType";
import moment from "moment";

function PrayerCard({ prayerName, time, img }: Prayer): React.ReactElement {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia component="img" height="100" image={img.src} alt={img.alt} />
        <CardContent>
          <h2 className="!font-bold text-2xl">{prayerName}</h2>
          <h1 className="text-3xl text-center mt-4">
            {moment(time, "hh:mm").format("h:mm a").toLocaleUpperCase()}
          </h1>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default PrayerCard;
