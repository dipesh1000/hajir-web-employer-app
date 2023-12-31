import { Grid } from "@mui/material";
import React from "react";
import MediaCard from "../MediaCard";

const MainDashboard = () => {
  return (
    <div>
      <Grid container rowSpacing={3} columnSpacing={3}>
        <Grid xs={6}>
          <MediaCard
            heading="CMYK"
            text="The CMYK color model (also known as process color, or four color) is a subtractive color model, based on the CMY color model, used in color printing, and is also used to describe the printing process itself."
          />
        </Grid>

        <Grid xs={6}>
          <MediaCard
            heading="CIELAB"
            text="The CIELAB color space, also referred to as L*a*b*, was intended as a perceptually uniform space, where a given numerical change corresponds to a similar perceived change in color."
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default MainDashboard;
