"use client";
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
  pointerEvents: "none",
});

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  margin: "auto",
  width: "1230px",
  height: "500px",
  marginLeft: "-20px",
  flexGrow: 1,
  backgroundColor: "rgba(34, 64, 139, 0.15)",
  elevation: "0",
}));

export default function DashboardFirstComponent() {
  // Format today's date
  const todayDate = format(new Date(), "EEEE, MMMM d, y");

  return (
    <StyledPaper elevation={0}>
      <Grid container spacing={4}>
        <Grid item xs={10} sm container direction="column" spacing={2}>
          <Grid item xs>
            <Typography
              variant="h4"
              fontWeight="bold"
              color="primary"
              gutterBottom
            >
              Welcome to Hajir 👋
            </Typography>
            <Typography
              variant="subtitle1"
              color="textSecondary"
              style={{ fontSize: "16px" }}
            >
              {todayDate}
            </Typography>
            <br />
            <Typography
              variant="body1"
              color="textSecondary"
              style={{ fontSize: "20px", marginTop: "20px" }}
            >
              Manage your company and employees with the best management system.
              <br />
              Good luck!
            </Typography>
          </Grid>
        </Grid>
        <Grid item>
          <ButtonBase
            sx={{
              width: "100%",
              height: "100%",
              boxShadow: "none",
              pointerEvents: "none",
            }}
          >
            <Img
              alt="complex"
              src="/dashboard/right-img.png"
              sx={{ height: "500px" }}
            />
          </ButtonBase>
        </Grid>
      </Grid>
    </StyledPaper>
  );
}
