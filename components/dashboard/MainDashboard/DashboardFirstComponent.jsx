"use client";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import { format } from "date-fns";
import Image from "next/image";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
  pointerEvents: "none",
});

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  // margin: "-20px",
  width: "100%",
  flexGrow: 1,
  backgroundColor: "rgba(34, 64, 139, 0.15)",
  elevation: "0",
}));

export default function DashboardFirstComponent() {
  const todayDate = format(new Date(), "EEEE, MMMM d, y");

  return (
    <StyledPaper elevation={0}>
      <Grid
        container
        spacing={4}
        //  alignItems="center"
      >
        <Grid item xs={12} sm={6}>
          {" "}
          {/* Adjusted xs and sm properties */}
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
            Manage your company and employees with the best management system.{" "}
            <br /> Good luck!
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <ButtonBase
            sx={{
              width: "100%",
              height: "100%",
              // boxShadow: "none",
              pointerEvents: "none",
            }}
          >
            <Image
              width={450}
              height={450}
              alt="complex"
              src="/dashboard/right-img.png"
            />
          </ButtonBase>
        </Grid>
      </Grid>
    </StyledPaper>
  );
}
