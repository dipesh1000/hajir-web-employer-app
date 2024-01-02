import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import { format } from "date-fns";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "250px",
  maxHeight: "250px",
});

export default function DashboardFirstComponent() {
  // Format today's date
  const todayDate = format(new Date(), "EEEE, MMMM d, y");

  return (
    <Paper
      sx={{
        p: 2,
        margin: "auto",
        maxWidth: 800,
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#1A2027" : "#f2f2f2", // Change to the desired gray color
      }}
    >
      <Grid container spacing={8}>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={8}>
            <Grid item xs spacing={8}>
              <Typography
                variant="h5"
                color="primary"
                sx={{ textAlign: "left" }}
              >
                Hello Biraj Karki 👋
              </Typography>
              <br />
              <Typography
                variant="body2"
                // color="text.secondary"
                sx={{ textAlign: "left" }}
              >
                {todayDate}
              </Typography>
              <br />
              <br />
              <Typography
                sx={{ cursor: "pointer", textAlign: "left" }}
                variant="body2"
              >
                Manage your company and employee with the best management
                system. Good luck!
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <ButtonBase sx={{ width: "100% ", height: "100%" }}>
            <Img alt="complex" src="/dashboard/right-img.png" />
          </ButtonBase>
        </Grid>
      </Grid>
    </Paper>
  );
}
