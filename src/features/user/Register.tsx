import { useState, FormEvent } from "react"
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import { useNavigate } from "react-router-dom"
import { Grid, Typography, Button, TextField, FormControl } from "@mui/material"
import { registerUser, loginUser } from "./userSlice"
import { setLocalStorageUserId } from "../../utils/persistance/localStorage"
import { selectLoadingIndicator } from "../loadingIndicator/loadingIndicatorSlice"
import LoadingIndicator from "../loadingIndicator/LoadingIndicator"

export default function Register() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const loadingIndicator = useAppSelector(selectLoadingIndicator)

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
        setLocalStorageUserId(loginRes.payload.id)
        navigate(`/`)
      }
    }
  }

  return (
    <div>
      {loadingIndicator.value ? (
        <LoadingIndicator />
      ) : (
        <Grid container spacing={3} marginTop="10vh">
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
                    error={newUsername.length > 20}
                    helperText="20 character max"
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
                    error={newEmail.length > 40}
                    helperText="40 character max"
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
      )}
    </div>
  )
}
