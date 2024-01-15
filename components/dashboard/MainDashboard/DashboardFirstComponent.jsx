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
  maxWidth: "100%",
  maxHeight: "100%",
});

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  margin: "auto",
  maxWidth: 800,
  flexGrow: 1,
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#f2f2f2",
}));

export default function DashboardFirstComponent() {
  // Format today's date
  const todayDate = format(new Date(), "EEEE, MMMM d, y");

  return (
    <StyledPaper>
      <Grid container spacing={4}>
        <Grid item xs={12} sm container direction="column" spacing={2}>
          <Grid item xs>
            <Typography
              variant="h4"
              fontWeight="bold"
              color="primary"
              gutterBottom
            >
              Welcome to Hajir 👋
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {todayDate}
            </Typography>
            <br />
            <Typography variant="body1" color="textSecondary">
              Manage your company and employees with the best management system.
              Good luck!
            </Typography>
          </Grid>
        </Grid>
        <Grid item>
          <ButtonBase sx={{ width: "100%", height: "100%" }}>
            <Img alt="complex" src="/dashboard/right-img.png" />
          </ButtonBase>
        </Grid>
      </Grid>
    </StyledPaper>
  );
}
