import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Container, Stack } from "@mui/material";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";

export default function FirstDashboard() {
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "flex-start", // Move content to the left
        alignItems: "flex-start", // Move content up
        height: "100vh",
        paddingLeft: "20px", // Add padding to the left
        paddingTop: "20px", // Add padding to the top
      }}
    >
      <Card sx={{ width: "80%", maxWidth: 600, textAlign: "left" }}>
        <CardActionArea>
          <CardContent>
            <Stack spacing={3} alignItems="center">
              <Typography variant="h4" gutterBottom>
                Welcome to Hajir 👋
              </Typography>
              <Typography variant="body1" gutterBottom>
                Best employee and staff management software with unique
                features.
              </Typography>
              <CardMedia
                component="img"
                width="100%" // Ensure the image takes 100% width
                height="auto" // Auto adjust the height to maintain aspect ratio
                image="/dashboard/no-company.png"
                alt="Picture of the author"
              />
              <Link href="/dashboard/company" passHref>
                <Fab color="primary" aria-label="add">
                  <AddIcon />
                </Fab>
              </Link>
            </Stack>
          </CardContent>
        </CardActionArea>
      </Card>
    </Container>
  );
}
