import { useState, FormEvent } from "react"
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import { useNavigate } from "react-router-dom"
import { Grid, Typography, Button, TextField, FormControl } from "@mui/material"
import { selectUser, updateUser, updateTokens, loginUser } from "./userSlice"

export default function Login() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const handleUserLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const loginRes = await dispatch(
      loginUser({
        username: username,
        password: password,
      }),
    )
    if (loginRes.meta.requestStatus === "fulfilled") {
      dispatch(updateUser(loginRes.payload))
      dispatch(updateTokens(loginRes.payload))
      navigate(`/`)
    }
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h2" gutterBottom textAlign={"center"}>
          Log In
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <form onSubmit={handleUserLogin}>
          <Grid item xs={12}>
            <FormControl sx={{ m: 1, width: 300 }}>
              <TextField
                id="username-input"
                label="Username"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </FormControl>
          </Grid>
          <Grid container direction="row" justifyContent="center">
            <Button variant="contained" type="submit">
              Log in
            </Button>
          </Grid>
        </form>
        <Typography variant="body1" textAlign={"center"} sx={{ marginTop: 4 }}>
          Don't have an account?
        </Typography>
        <Button variant="text" onClick={() => navigate("/register")}>
          Register
        </Button>
      </Grid>
    </Grid>
  )
}
