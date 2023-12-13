import * as React from "react"
import { Grid, CircularProgress, Typography } from "@mui/material"

export default function LoadingIndicator() {
  return (
    <Grid
      container
      minHeight="100%"
      display="flex"
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid item xs={12} marginTop="15vh">
        <CircularProgress />
        <Typography variant="h6" marginTop={2}>
          Loading...
        </Typography>
      </Grid>
    </Grid>
  )
}
