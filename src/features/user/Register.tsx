import { useState, FormEvent } from "react"
import { useAppDispatch } from "../../app/hooks"
import { useNavigate } from "react-router-dom"
import { Grid, Typography, Button, TextField, FormControl } from "@mui/material"
import { updateUser, registerUser, loginUser } from "./userSlice"

export default function Register() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [newUsername, setNewUsername] = useState<string>("")
  const [newEmail, setNewEmail] = useState<string>("")
  const [newPassword, setNewPassword] = useState<string>("")
  const [newPasswordRepeat, setNewPasswordRepeat] = useState<string>("")

  const handleUserRegistration = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const regRes = await dispatch(
      registerUser({
        username: newUsername,
        email: newEmail,
        password: newPassword,
        roles: ["user"],
      }),
    )
    if (regRes.meta.requestStatus === "fulfilled") {
      const loginRes = await dispatch(
        loginUser({ username: newUsername, password: newPassword }),
      )
      if (loginRes.meta.requestStatus === "fulfilled") {
        dispatch(updateUser(loginRes.payload))
        navigate(`/`)
      }
    }
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h2" gutterBottom textAlign={"center"}>
          Register
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <form onSubmit={handleUserRegistration}>
          <Grid item xs={12}>
            <FormControl sx={{ m: 1, width: 300 }}>
              <TextField
                id="username-input"
                label="Username"
                variant="outlined"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                required
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl sx={{ m: 1, width: 300 }}>
              <TextField
                id="email-input"
                label="Email"
                variant="outlined"
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                required
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl sx={{ m: 1, width: 300 }}>
              <TextField
                id="password-input"
                label="Password"
                variant="outlined"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl sx={{ m: 1, width: 300 }}>
              <TextField
                id="repeat-password-input"
                label="Re-enter Password"
                variant="outlined"
                type="password"
                value={newPasswordRepeat}
                onChange={(e) => setNewPasswordRepeat(e.target.value)}
                required
                error={newPassword !== newPasswordRepeat}
                helperText="Passwords must match"
              />
            </FormControl>
          </Grid>
          <Grid container direction="row" justifyContent="center">
            <Button variant="contained" type="submit">
              Register
            </Button>
          </Grid>
        </form>
      </Grid>
    </Grid>
  )
}
