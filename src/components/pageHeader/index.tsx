import React from "react"
import { Grid, Typography, Button } from "@mui/material"
import "./style.css"

interface PageHeaderProps {
  title: string
  buttonTitle: string
  buttonOnClick: () => void
}

export function PageHeader(props: PageHeaderProps) {
  return (
    <Grid
      container
      sx={{ margin: 2, paddingLeft: 3, paddingRight: 3 }}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <Typography
        variant="h3"
        textAlign={"left"}
        sx={{ paddingTop: 2 }}
        gutterBottom
      >
        {props.title}
      </Typography>
      <Button
        variant="contained"
        sx={{ height: 40 }}
        onClick={props.buttonOnClick}
      >
        {props.buttonTitle}
      </Button>
    </Grid>
  )
}
