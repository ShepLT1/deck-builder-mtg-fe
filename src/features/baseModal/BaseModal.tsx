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
