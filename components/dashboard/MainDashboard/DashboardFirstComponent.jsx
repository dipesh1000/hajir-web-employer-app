"use client";
import * as React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import { format } from "date-fns";
import Image from "next/image";

const DashboardFirstComponent = () => (
  <Paper
    sx={{
      padding: (theme) => theme.spacing(3),
      width: "100%",
      flexGrow: 1,
      backgroundColor: "rgba(34, 64, 139, 0.15)",
      elevation: 0,
    }}
  >
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div style={{ width: "50%" }}>
        <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
          Welcome to Hajir 👋
        </Typography>
        <Typography
          variant="subtitle1"
          color="textSecondary"
          sx={{ fontSize: "16px" }}
        >
          {format(new Date(), "EEEE, MMMM d, y")}
        </Typography>
        <br />
        <Typography
          variant="body1"
          color="textSecondary"
          sx={{ fontSize: "20px", marginTop: "20px" }}
        >
          Manage your company and employees with the best management system.{" "}
          <br /> Good luck!
        </Typography>
      </div>
      <div style={{ width: "50%" }}>
        <ButtonBase>
          <Image
            width={450}
            height={450}
            alt="complex"
            src="/dashboard/right-img.png"
          />
        </ButtonBase>
      </div>
    </div>
  </Paper>
);

export default DashboardFirstComponent;
