import React from "react"
import Popover from "@mui/material/Popover"
import IconButton from "@mui/material/IconButton"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import Button from "@mui/material/Button"
import ButtonGroup from "@mui/material/ButtonGroup"
import { Card } from "../../features/card/cardSlice"
import { useAppDispatch } from "../../app/hooks"
import "./style.css"

export default function OptionPopover(props: Card) {
  const dispatch = useAppDispatch()
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? "options-popover" : undefined

  // TODO: add onclick handlers for buttons that fire deckSlice thunks/actions

  const buttons = [
    <Button key="add-one">Add One</Button>,
    <Button key="rm-one" color="warning">
      Remove One
    </Button>,
    <Button key="rm-all" color="error">
      Remove All
    </Button>,
  ]

  return (
    <div className="vert-div">
      <IconButton aria-label="options" onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <ButtonGroup
          orientation="vertical"
          aria-label="vertical contained button group"
          variant="text"
        >
          {buttons}
        </ButtonGroup>
      </Popover>
    </div>
  )
}
