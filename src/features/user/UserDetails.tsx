import * as React from "react"
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import { selectUser, updateUser } from "./userSlice"

export default function UserDetails() {
  const user = useAppSelector(selectUser)
  const dispatch = useAppDispatch()

  return <div></div>
}
