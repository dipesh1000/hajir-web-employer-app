import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Container, Grid, Stack } from "@mui/material";
import Image from "next/image";

export default function FirstDashboard() {
  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Stack>
        <Typography variant="h3" gutterBottom>
          Welcome to Hajir 👋
        </Typography>
        <Typography variant="body1" gutterBottom>
          Best employee and staff management software
          <br />
          with unique features.
        </Typography>
        <Image
          src="/dashboard/no-company.png"
          alt="Picture of the author"
          width={150}
          height={150}
        />
      </Stack>
    </Grid>
  );
}
