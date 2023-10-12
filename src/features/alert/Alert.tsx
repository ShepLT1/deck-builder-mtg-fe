import * as React from "react"
import Box from "@mui/material/Box"
import Alert from "@mui/material/Alert"
import IconButton from "@mui/material/IconButton"
import Collapse from "@mui/material/Collapse"
import CloseIcon from "@mui/icons-material/Close"
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import { selectAlert, closeAlert } from "./alertSlice"

export default function AlertBar() {
  const alert = useAppSelector(selectAlert)
  const dispatch = useAppDispatch()

  return (
    <Box sx={{ width: "100%" }}>
      <Collapse in={alert.isOpen}>
        <Alert
          severity={alert.isError ? "error" : "success"}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                dispatch(closeAlert())
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {alert.value}
        </Alert>
      </Collapse>
    </Box>
  )
}
