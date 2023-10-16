import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import { selectBaseModal, updateBaseModal } from "./baseModalSlice"
import React from "react"

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
}

interface Props {
  children: React.ReactNode
}

// 1. Edit Card.tsx to be of type form that will get rendered into Form feature if case matches
//    - CardForm will display and have actions based on create vs update case
// 2. If formState.feature = deck, render a simpl create deck form within Form feature and dispatch createDeck action on submit

export default function BaseModal(props: Props) {
  const baseModal = useAppSelector(selectBaseModal)
  const dispatch = useAppDispatch()

  return (
    <div>
      <Modal
        open={baseModal.value}
        onClose={() => dispatch(updateBaseModal(false))}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>{props.children}</div>
        </Box>
      </Modal>
    </div>
  )
}
